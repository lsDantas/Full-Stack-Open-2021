import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleChange = (event) => {
    const content = event.target.value;
    props.setFilter(content);
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

const mapDispatchToProps = {
  setFilter,
}

export default connect(null, mapDispatchToProps)(Filter);