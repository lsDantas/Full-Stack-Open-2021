
import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';

// Components
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors');
  const [error, setError] = useState(null);

  // Authentication and Session
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('books-app-user-token');

    if (loggedUserJSON) {
      setToken(loggedUserJSON);
    }
  }, []);
  
  // Login Form
  if (!token) {
    return <div><LoginForm setToken={setToken} setError={setError}/></div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('add')}>Add Book</button>
        <button onClick={logout}>Logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App;
