import React from 'react';
import { connect } from 'react-redux';

// Bootstrap
import { Button, Form } from 'react-bootstrap'

// Reducers
import { setFailureNotif, clearFailureNotif } from '../reducers/failureNotifReducer';
import { login } from '../reducers/userReducer';

const LoginForm = (props) => {
  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    // Login with Credentials
    const credentials = {
      username: formDataObj.username,
      password: formDataObj.password,
    };

    try {
      await props.login(credentials);

      // Clear Form
      event.target.username.value = '';
      event.target.password.value = '';
      props.clearFailureNotif();
    } catch (exception) {
      // Invalid Credentials
      props.setFailureNotif('Wrong credentials.', 5000);
    }
  };

  return (
    <Form id="login-form" onSubmit={handleLogin}>
      <h2>Log in to the Application</h2>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control id="login-username" name="username" type="text" placeholder="Enter username" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control id="login-password" name="password" type="password" placeholder="Enter password" />
      </Form.Group>
      <Button id='login-button' type="submit">Login</Button>
    </Form>
  );
};

const mapDispatchToProps = {
  setFailureNotif,
  clearFailureNotif,
  login,
};

export default connect(null, mapDispatchToProps)(LoginForm);
