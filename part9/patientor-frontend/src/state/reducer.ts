import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
    }
  | { 
    type: "SET_DIAGNOSES_LIST", 
    payload: Diagnosis[] 
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ( { ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      const updatedPatient: Patient = action.payload;
      return {
        ...state,
        patients: {
          ...state.patients,
          [updatedPatient.id]: updatedPatient
        }
       };

    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patientList };
};

export const setDiagnosesList = (diagnosesList: Diagnosis[]) : Action => {
  return { type: "SET_DIAGNOSES_LIST", payload: diagnosesList };
};

export const addPatient = (newPatient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: newPatient };
};

export const updatePatient = (updatedPatient: Patient): Action => {
  return { type: "UPDATE_PATIENT", payload: updatedPatient };
};
