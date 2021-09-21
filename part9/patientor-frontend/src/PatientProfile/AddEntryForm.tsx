import React from "react";

// UI Elements
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, DiagnosisSelection } from "../AddPatientModal/FormField";

// State Management
import { useStateValue } from "../state";

// Types
import { EntryWithoutId, HealthCheckRating } from '../types';

interface Props { 
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
  selectedMode: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  const possibleValues = [0, 1, 2, 3];
  const valueMatchesParam = (value: number) => value === Number(param);
  return possibleValues.some(valueMatchesParam);
};

const getInitialSetup = (selectedMode: number): EntryWithoutId => {
  let newEntry: EntryWithoutId;
  switch (selectedMode) {
    case 0:
      newEntry = {
        description: "",
        date: "",
        specialist: "",
        type: "HealthCheck",
        healthCheckRating: 0,
      };
      return newEntry;
    case 1:
      newEntry = {
        description: "",
        date: "",
        specialist: "",
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      };
      return newEntry;
    case 2:
      newEntry = {
        description: "",
        date: "",
        specialist: "",
        type: "Hospital",
        discharge: {
          date: "",
          criteria: ""
        }
      };
      return newEntry;
    default:
      throw new Error("Couldn't resolve entry type.");
  }
};

export const AddEntryForm = ({ onSubmit, onCancel, selectedMode }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const initialSetup: EntryWithoutId = getInitialSetup(selectedMode);

  return (
    <Formik
      initialValues={initialSetup}
      onSubmit={onSubmit}
      validate={(values)=> {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};

        // General Entry Types
        if(!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        // Specific Entry Types
        if(values.type === "HealthCheck") {
          if (!isHealthCheckRating(values.healthCheckRating)) {
            errors.healthCheckRating = requiredError;
          }
        } 

        if(values.type === "OccupationalHealthcare") {
         if(!values.employerName) {
           errors.employerName = requiredError;
         }
        }

        if(values.type === "Hospital") {
          if(!values.discharge.date) {
            errors.discharge = requiredError;
          }
          if (!values.discharge.criteria) {
            errors.discharge = requiredError;
          }
        }
        
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return(
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection 
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            { 
              selectedMode === 0 &&
              <Field
                label="Health Check Rating"
                placeholder="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            }
            {
              selectedMode === 1 &&
              <>
              <Field
                label="Employer Name"
                placeholder="Employer Name"
                name="employerName"
                component={TextField}
              />
              <Field
                label="Start Date"
                placeholder="Start Date"
                name="sickLeave.startDate"
                component={TextField}
              />
              <Field
                label="End Date"
                placeholder="End Date"
                name="sickLeave.endDate"
                component={TextField}
              />
              </>
            }
            {
              selectedMode === 2 &&
              <>
                <Field
                  label="Discharge Date"
                  placeholder="DischargeDate"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Discharge Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            }
            
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
