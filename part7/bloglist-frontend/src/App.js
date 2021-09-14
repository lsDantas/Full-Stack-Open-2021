import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './index.css';

// Components
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import LoggedInterface from './components/LoggedInterface';

// Reducers
import { initializeBlogs } from './reducers/blogsReducer';
import { setFailureNotif } from './reducers/failureNotifReducer';
import { loadLoggedUser } from './reducers/userReducer';

const App = (props) => {
  // Fetch Blogs from Server
  useEffect(() => {
    props.initializeBlogs();
  }, []);

  // Check for Logged-In User
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (loggedUserJSON) {
      props.loadLoggedUser(loggedUserJSON);
    }
  }, []);

  return (
    <div>
      {props.successMessage !== null && <Notification class="success-notification" id="success-notification" message={props.successMessage} notificationStyle="successNotification" />}
      {props.failureMessage !== null && <Notification class="failure-notification" id="failure-notification" message={props.failureMessage} notificationStyle="failureNotification"/>}
      { props.user === null
        ? <LoginForm />
        : <LoggedInterface />
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    successMessage: state.successNotif.text,
    failureMessage: state.failureNotif.text,
    user: state.user,
  };
};

const mapDispatchToProps = {
  initializeBlogs,
  loadLoggedUser,
  setFailureNotif,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
