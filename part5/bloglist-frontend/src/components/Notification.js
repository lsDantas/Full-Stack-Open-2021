import React from 'react';

const Notification = ({ id, message, notificationStyle }) => {
  if (message === null) {
    return null;
  }

  return (
    <div id={id} className={notificationStyle}>
      {message}
    </div>
  );
}

export default Notification;