import { NewPatientEntry, Gender, EntryWithoutId, Diagnosis, HealthCheckRating} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseText = (text: unknown): string => {
  if (!text || !isString(text) ) {
    throw new Error('Incorrent or missing text field.');
  }

  return text;
};

const isEntryType = (entryType: unknown): entryType is "HealthCheck" | "OccupationalHealthcare" | "Hospital" => {
  return (entryType === "HealthCheck" || entryType === "OccupationalHealthcare" || entryType === "Hospital");
};

const parseEntryType = (entryType: unknown): "HealthCheck" | "OccupationalHealthcare" | "Hospital" => {
  if (!entryType || !isEntryType(entryType) ) {
    throw new Error('Invalid entry type');
  }

  return entryType;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const areDiagnoses = (param: any): param is Array<Diagnosis['code']> => {
  if (Array.isArray(param) && param.every(isString)) {
    return true;
  }
  return false;
};

const parseDiagnoses = (diagnosesCodes: unknown) : Array<Diagnosis['code']> => {
  // Check if it Exists
  if (!diagnosesCodes || !areDiagnoses(diagnosesCodes)) {
    throw new Error('Invalid array of codes for diagnoses.');
  } 

  return diagnosesCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  const possibleValues = [0,1,2,3];
  const valueMatchesParam = (value: number) => value === param;
  return possibleValues.some(valueMatchesParam);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Invalid health check rating.');
  }

  return healthCheckRating;
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

type EntryFields = { description: unknown, date: unknown, specialist: unknown, diagnosisCodes?: unknown, type: unknown, healthCheckRating?: unknown, employerName?: unknown, sickLeave?: { startDate: string, endDate: string }, discharge?: { date: unknown, criteria: unknown } };

const toEntry = ({ description, date, specialist, diagnosisCodes, type, healthCheckRating, employerName, sickLeave, discharge}: EntryFields): EntryWithoutId => {
  const emptyDiagnoses: Array<Diagnosis['code']> = [];

  let newEntry: EntryWithoutId;
  const parsedType = parseEntryType(type);
  switch (parsedType) {
    case "HealthCheck":
      newEntry = {
        description: parseText(description),
        date: parseDate(date),
        specialist: parseText(specialist),
        diagnosisCodes: (diagnosisCodes ? parseDiagnoses(diagnosisCodes) : emptyDiagnoses),
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
      return newEntry;
    case "OccupationalHealthcare":
      newEntry = {
        description: parseText(description),
        date: parseDate(date),
        specialist: parseText(specialist),
        diagnosisCodes: (diagnosisCodes ? parseDiagnoses(diagnosisCodes) : emptyDiagnoses),
        type: "OccupationalHealthcare",
        employerName: parseText(employerName),
        ...(sickLeave && 
          {
            sickLeave: {
              startDate: parseDate(sickLeave.startDate),
              endDate: parseDate(sickLeave.endDate)
            }
          })
      };
      return newEntry;
    case "Hospital":
      newEntry = {
        description: parseText(description),
        date: parseDate(date),
        specialist: parseText(specialist),
        diagnosisCodes: (diagnosisCodes ? parseDiagnoses(diagnosisCodes) : emptyDiagnoses),
        type: "Hospital",
        discharge: {
          date: parseDate(discharge?.date),
          criteria: parseText(discharge?.criteria)
        }
      };
      return newEntry;
    default:
      return assertNever(parsedType);
  }
};

const toID = (id : unknown): string => {
  const parsedID: string = parseText(id);
  return parsedID;
};

const assertNever = (parsedType: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${parsedType}`
  );
};

export default { toNewPatientEntry, toID, toEntry };

