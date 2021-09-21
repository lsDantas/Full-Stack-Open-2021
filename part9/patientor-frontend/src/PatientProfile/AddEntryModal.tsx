import React, { useState } from 'react';

import { Modal, Segment, Dropdown } from 'semantic-ui-react';
// import { Field, Formik, Form } from "formik";
import { AddEntryForm } from './AddEntryForm';

import { EntryWithoutId } from '../types';

interface Props { 
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [selectedMode, setSelectedMode] = useState <number>(0);
  const entryOptions = [
    {
      key: "HealthCheck",
      text: "Health Check",
      value: 0
    },
    {
      key: "OccupationalHealthcare",
      text: "Occupational Healthcare",
      value: 1
    },
    {
      key: "Hospital",
      text: "Hospital",
      value: 2
    }
  ];

  return (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new medical entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <Dropdown
        placeholder="Select entry type"
        fluid
        selection
        options={entryOptions}
          onChange={(e, data) => Number(data.value) ? setSelectedMode(Number(data.value)) : selectedMode }
      />
      {
          entryOptions.some((entry) => entry.value === selectedMode) &&
          <AddEntryForm onSubmit={onSubmit} onCancel={onClose} selectedMode={selectedMode} />
      }
    </Modal.Content>
  </Modal>
  );
};

export default AddEntryModal;
