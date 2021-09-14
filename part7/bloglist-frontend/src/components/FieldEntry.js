import React from 'react';

const FieldEntry = ({ id, classRef, refName, }) => (
  <div>
    {classRef}
    <input
      id={id}
      className={classRef}
      type="text"
      name={refName}
    />
  </div>
);

export default FieldEntry;