/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

import { apiBaseUrl } from "../constants";

import { Patient, Entry } from "../types";

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

  // Patient Fetch
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Selected ID
  const { id } = useParams<{ id: string }>();
  const parsedID: string = parseID(id);

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

        setLoading(false);
      });
    }, []);

  // While patient fetch incomplete.
  if (loading) {
    return (<h3>Loading...</h3>);
  }

  // No Patient Found
  if(!patient) {
    return (<h3>Patient not found.</h3>);
  }

  // Patient Found
  return(
    <div>
      <h3>{patient.name} {(patient.gender === "male") ? "♂" : "♀"}</h3>
      SSN: {patient.ssn}
      <br></br>
      Occupation: {patient.occupation}
      <br></br>
      <h2>Entries</h2>
      {
        patient.entries.map((entry: Entry) => 
          <div key={`entry-${entry.id}`}>
            {entry.date} <i>{entry.description}</i>
            <ul>
              {entry.diagnosisCodes?.map((code: string) => 
                <li key={`diagnosis-code-${entry.id}-${code}`}>{code}</li>
              )}
            </ul>
          </div>
        )
      }
    </div>
  );
};

export default PatientProfile;
