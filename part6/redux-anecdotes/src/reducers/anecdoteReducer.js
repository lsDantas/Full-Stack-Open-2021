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
    const updatedAnecdote = action.data;
    const replaceChangedEntry = (anecdote) => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote;
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

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    // Increment Anecdote Entry Vote Count
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    const updatedAnecdote = await anecdoteService.update(changedAnecdote);

    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    });
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
