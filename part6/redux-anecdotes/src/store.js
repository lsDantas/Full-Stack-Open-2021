import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';
import anecdoteReducer from './reducers/anecdoteReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  filter: filterReducer,
  anecdotes: anecdoteReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;
