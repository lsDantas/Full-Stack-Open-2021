import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

// Bootstrap
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  // Define CSS Styles for Visiblity
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button id={props.id} onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Toggable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
export const proptype = Togglable.PropTypes;