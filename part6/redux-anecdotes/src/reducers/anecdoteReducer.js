import anecdoteService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
  case 'INIT_ANECDOTES':
    return action.data;
  case 'VOTE': {
    const id = action.data.id;
    const anecdoteToChange = state.find(entry => entry.id === id);
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };

    const replaceChangedEntry = (anecdote) => anecdote.id === id ? changedAnecdote : anecdote;
    const byLikes = (anec1, anec2) => anec2.votes - anec1.votes;

    return state.map(replaceChangedEntry).sort(byLikes);
  }
  case 'NEW_ANECDOTE': {
    return [...state, action.data];
  }
  default:
    return state;
  }
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();

    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  };
};

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);

    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  }
};

export default anecdoteReducer;
