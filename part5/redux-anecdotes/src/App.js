import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdotesList';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
