import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import successNotifReducer from './reducers/successNotifReducer';
import failureNotifReducer from './reducers/failureNotifReducer';
import blogReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  successNotif: successNotifReducer,
  failureNotif: failureNotifReducer,
  blogs: blogReducer,
  user: userReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;