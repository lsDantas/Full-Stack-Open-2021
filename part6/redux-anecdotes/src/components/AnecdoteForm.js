import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.anecdoteText.value;
    event.target.anecdoteText.value = '';
    props.createAnecdote(content);

    // Display Notification
    props.setNotification(`You created '${content}'.`, 5000);
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdoteText"/></div>
        <button>create</button>
      </form>
    </div>
  );

};

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm);
