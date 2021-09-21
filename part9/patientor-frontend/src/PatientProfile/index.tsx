/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

// UI Elements
import { Card, Icon, SemanticCOLORS, Button, List } from "semantic-ui-react";

// Network Communications
import { apiBaseUrl } from "../constants";

// State Management
import { updatePatient } from "../state";
import { useStateValue } from "../state";

// Types
import { Patient, Diagnosis, Entry, HealthCheckEntry, HealthCheckRating, OccupationalHealthcareEntry, HospitalEntry, EntryWithoutId} from "../types";
import AddEntryModal from "./AddEntryModal";

function assertNever(value: never): never {
  throw new Error("Unhandled entry union member.");
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseID = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrent or missing text field.');
  }

  return text;
};

const PatientProfile = () => {
  const [error, setError] = React.useState<string | undefined>();

  // General Patients - State
  const [{ patients }, dispatch] = useStateValue();

  // Specific Patient - State
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [patientLoading, setPatientLoading] = useState<boolean>(true);

  // Diagnoses Fetch
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | undefined>(undefined);
  const [diagnosesLoading, setDiagnosesLoading] = useState<boolean>(true);

  // New Medical Entry Modal
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  // Selected ID
  const { id } = useParams<{ id: string }>();
  const parsedID: string = parseID(id);

  // Fetch Patient Profile
  useEffect(() => {
    void axios
      .get<Patient>(`${apiBaseUrl}/patients/${parsedID}`)
      .then((response) => {
        if (response?.status === 200) {
          setPatient(response.data);
        } else {
          console.error('Unable to fetch patient information.');
          setError('Unable to fetch patient information.');
        }

        setPatientLoading(false);
      });
    }, []);

  // Fetch Diagnoses Date
  useEffect(() => {
    void axios
      .get<Diagnosis[]>(`${apiBaseUrl}/diagnoses/`)
      .then((response) => {
        if (response?.status === 200) {
          setDiagnoses(response.data);
        } else {
          console.error('Unable to fetch diagnoses information.');
          setError('Unable to fetch diagnoses information.');
        }

        setDiagnosesLoading(false);
      });
  }, []);

  // While patient fetch incomplete.
  if (patientLoading || diagnosesLoading) {
    return (<h3>Loading...</h3>);
  }

  // No Patient Found
  if(!patient) {
    return (<h3>Patient not found.</h3>);
  }

  // Add New Patient Entry
  const submitNewEntry = async (values: EntryWithoutId) => {
    console.log('Values: ', values);
    try {
      console.log(`${apiBaseUrl}/patients/${patient.id}/entries`);
      const { data: updatedPatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${patient.id}/entries`, values);

      dispatch(updatePatient(updatedPatient));
      setPatient(updatedPatient);
      closeModal();
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.error(e.response?.data || 'Unknown Error');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  // Fetch Entry Details
  const getCodeDescription = (code: string): string => {
    const matchingCodes = (diagnosis: Diagnosis): boolean => diagnosis.code === code;
    const matchingDiagnosis: Diagnosis | undefined = diagnoses?.find(matchingCodes);
    
    if (matchingDiagnosis) {
      return matchingDiagnosis.name;
    }

    return "No description available";
  };

  return(
    <div>
      <h3>{patient.name} {(patient.gender === "male") ? "♂" : "♀"}</h3>
      SSN: {patient.ssn}
      <br></br>
      Occupation: {patient.occupation}
      <br></br>
      <h3>Entries</h3>
      <Card.Group>
        {
          patient.entries.map((entry: Entry) => 
          <Card key={`entry-details-${entry.id}`} fluid>
            <Card.Content>
              <Card.Header content={entry.date} />
              <Card.Meta>
                {entry.description} 
              </Card.Meta>
              <Card.Description>
                  {(entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 &&
                  <>
                    <List>
                      <List.Item>
                        <List.Header>Diagnoses:</List.Header>
                      </List.Item>
                      {entry.diagnosisCodes?.map((code) => 
                        <List.Item key={`entry-diagnoses-${entry.id}-${code}`}>
                          {code} - {getCodeDescription(code)}
                        </List.Item> 
                      )}
                    </List>
                  </>
                  )}
                  <br></br>
                  <EntryDetails entry={entry} />
              </Card.Description>
            </Card.Content>
          </Card>
          )
        }
      </Card.Group>
      <br></br>
      <AddEntryModal 
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch(entry.type) {
    case "Hospital":
      return <HospitalDetails entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails entry={entry}/>;
    case "HealthCheck":
      return <HealthCheckDetails entry={entry}/>;
    default:
      return assertNever(entry);
  }
};

const HospitalDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <><b>Discharged on:</b> {entry.discharge.date}</>
  );
};

const OccupationalHealthcareDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <><b>Employer:</b> {entry.employerName}</>
  );
};

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  let colorTest: SemanticCOLORS;
  let useColor = false;
  
  switch (entry.healthCheckRating) {
    case 0:
      colorTest = "green";
      useColor = true;
      break;
    case 1:
      colorTest = "yellow";
      useColor = true;
      break;
    case 2: 
      colorTest = "orange";
      useColor = true;
      break;
    case 3: 
      colorTest = "red";
      useColor=true;
      break;
    default:
      colorTest = "grey";
      useColor = false;
      break;
  }

  const colorMap = { 
    0: "green",
    1: "yellow", 
    2: "orange",
    3: "red", 
  };
  
  const color: string | undefined = (colorMap[entry.healthCheckRating])
    ? colorMap[entry.healthCheckRating]
    : undefined;

  return (
    <>{useColor && <Icon color={colorTest} name="heart" />}</>
  );
};



export default PatientProfile;

