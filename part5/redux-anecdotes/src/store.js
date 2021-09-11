import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer';
import anecdoteReducer from './reducers/anecdoteReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  anecdotes: anecdoteReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
