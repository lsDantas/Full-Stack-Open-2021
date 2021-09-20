import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseText = (text: unknown): string => {
  if (!text || !isString(text) ) {
    throw new Error('Incorrent or missing text field.');
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date) ) {
    throw new Error('Incorrect or missing date.');
  }

  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrent or missing SSN.');
  }

  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown) : Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender.');
  }

  return gender;
};

type PatientEntryFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: PatientEntryFields): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseText(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseText(occupation),
  };

  return newPatient;
};

const toID = (id : unknown): string => {
  const parsedID: string = parseText(id);
  return parsedID;
};

export default { toNewPatientEntry, toID };
