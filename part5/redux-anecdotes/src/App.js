import React from 'react';
import { useSelector } from 'react-redux';
import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdotesList';

const App = () => {
  const notification = useSelector(state => state.notification);

  return (
    <div>
      <h2>Anecdotes</h2>
      {notification && <Notification />}
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
