import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdotesList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(state => {
    const matchesSearchTerm = (anecdote) => anecdote.content.includes(state.filter);
    const selectedAnecdotes = state.anecdotes.filter(matchesSearchTerm);
    return selectedAnecdotes;
  });

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));

    // Display Notification
    dispatch(setNotification(`You vote '${anecdote.content}'.`, 5000));
  };

  const byLikes = (anec1, anec2) => anec2.votes - anec1.votes;

  return (
    <div>
      {
        anecdotes.sort(byLikes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  );

};

export default AnecdotesList;
