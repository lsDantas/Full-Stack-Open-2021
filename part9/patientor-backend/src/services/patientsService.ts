import { v1 as uuid } from 'uuid';

import patientsData from '../../data/patients.json';

import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
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
    ...entry,
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default { 
  getNonSensitiveEntries,
  addNewPatient
};
