import React from 'react';
import { connect } from 'react-redux';

// Reducers
import { setFailureNotif } from '../reducers/failureNotifReducer';
import { login } from '../reducers/userReducer';

const LoginForm = (props) => {
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Login with Credentials
      const credentials = {
        username: event.target.username.value,
        password: event.target.password.value
      };
      await props.login(credentials);

      // Clear Form
      event.target.username.value = '';
      event.target.password.value = '';
    } catch (exception) {
      // Invalid Credentials
      props.setFailureNotif('Wrong credentials.', 5000);
    }
  };

  return (
    <form id="login-form" onSubmit={handleLogin}>
      <h2>Log in to the Application</h2>
      <div>
        Username
        <input
          id="login-username"
          type="text"
          name="username"
        />
      </div>
      <div>
        Password
        <input
          id="login-password"
          type="password"
          name="password"
        />
      </div>
      <button id='login-button' type="submit">Login</button>
    </form>
  );
};

const mapDispatchToProps = {
  setFailureNotif,
  login,
};

export default connect(null, mapDispatchToProps)(LoginForm);
