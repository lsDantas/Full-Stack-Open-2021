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
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  const possibleValues = [0, 1, 2, 3];
  const valueMatchesParam = (value: number) => value === Number(param);
  return possibleValues.some(valueMatchesParam);
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  console.log(diagnoses);

  return (
    <Formik
      initialValues={
        {
          description: "",
          date: "",
          specialist: "",
          type: "HealthCheck",
          healthCheckRating: 0,
        }}
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
            <Field
              label="Health Check Rating"
              placeholder="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
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
