import React from 'react';

const Notification = (props) => {
  return (
    <div className={props.class}>
      {props.message}
    </div>
  );
};

export default Notification;
