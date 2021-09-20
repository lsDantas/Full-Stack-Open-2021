/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useParams } from 'react-router-dom';
import { Patient } from "../types";

import { useStateValue } from "../state";

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
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();
  const parsedID: string = parseID(id);

  const matchingIDs = (entry: Patient): boolean => entry.id === parsedID;
  const patient: Patient | undefined = Object.values(patients).find(matchingIDs);

  if(!patient) {
    return (<h3>Patient not found.</h3>);
  }
  console.log(patient);

  return(
    <div>
      <h3>{patient.name} {(patient.gender === "male") ? "♂" : "♀"}</h3>
      SSN: {patient.ssn}
      <br></br>
      Occupation: {patient.occupation}
    </div>
  );
};

export default PatientProfile;
