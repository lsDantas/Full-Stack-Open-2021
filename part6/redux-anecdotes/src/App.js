import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Components
import Notification from './components/Notification';
import Filter from './components/Filter';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdotesList';

// Services
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = (props) => {
  useEffect(() => {
    props.initializeAnecdotes();
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.notification.text && <Notification />}
      <Filter />
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  initializeAnecdotes,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
