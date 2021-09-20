import { v1 as uuid } from 'uuid';

import patientsData from '../../data/patients';

import { Patient, PublicPatient, NewPatientEntry, Entry } from '../types';

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addNewPatient = (entry : NewPatientEntry): Patient => {
  const id: string = uuid();
  const newPatient: Patient = {
    id,
    entries: [] as Entry[],
    ...entry,
  };
  patientsData.push(newPatient);
  return newPatient;
};

const getSpecificPatient = (id: string): Patient | undefined => {
  const matchingIDs = (patient: Patient) => patient.id === id;
  const selectedPatient = patientsData.find(matchingIDs);

  return selectedPatient;
};

export default { 
  getNonSensitiveEntries,
  addNewPatient,
  getSpecificPatient
};
