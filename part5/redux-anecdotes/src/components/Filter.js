import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const content = event.target.value;
    dispatch(setFilter(content));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter <input name="filterText" onChange={handleChange} />
    </div>
  );
};

export default Filter;