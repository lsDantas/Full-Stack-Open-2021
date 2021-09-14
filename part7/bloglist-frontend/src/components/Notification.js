import React from 'react';

const Notification = (props) => {
  return (
    <div className={props.class} id={props.id}>
      {props.message}
    </div>
  );
};

export default Notification;
