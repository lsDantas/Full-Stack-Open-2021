import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';

import patientsData from '../../data/patients';

import { Patient, PublicPatient, NewPatientEntry, Entry, EntryWithoutId } from '../types';

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

const addPatientEntries = (id: string, newEntry: EntryWithoutId) => {
  // Prepare Update Patient
  const entryId: string = uuid();
  const preparedEntry: Entry = {
    id: entryId,
    ...newEntry
  };
  
  const matchingPatient = (patient: Patient): boolean => patient.id === id;
  patients.find(matchingPatient)?.entries.push(preparedEntry);

  const updatedPatient = patients.find(matchingPatient);

  return updatedPatient;
};

const getSpecificPatient = (id: string): Patient | undefined => {
  const matchingIDs = (patient: Patient): boolean => patient.id === id;
  const selectedPatient = patientsData.find(matchingIDs);

  return selectedPatient;
};

export default { 
  getNonSensitiveEntries,
  addNewPatient,
  getSpecificPatient,
  addPatientEntries,
};
