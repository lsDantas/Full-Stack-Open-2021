import React from 'react';

// Bootstrap
import { Alert } from 'react-bootstrap'

const Notification = (props) => {
  return (
    <Alert variant={props.variant} className={props.class} id={props.id}>
      {props.message}
    </Alert>
  );
};

export default Notification;
