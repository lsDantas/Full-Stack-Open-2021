import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    }
  });

  // Check for Token
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('books-app-user-token', token)
    }

  }, [result.data]); //eslint-disable-line

  // Login Functionality Proper
  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Username <input 
            value={username}
            type="text"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password <input
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button> 
      </form>
    </div>
  );
};

export default LoginForm;
