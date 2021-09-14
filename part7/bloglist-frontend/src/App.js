import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import './index.css';

// Components
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import CreateBlogForm from './components/CreateBlogForm';

// Reducers
import { initializeBlogs } from './reducers/blogsReducer';
import { setFailureNotif } from './reducers/failureNotifReducer';
import { login, logout, loadLoggedUser } from './reducers/userReducer';

const App = (props) => {
  // References
  const createBlogFormRef = useRef();

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

  // Forms
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Login with Credentials
      const credentials = {
        username: event.target.username.value,
        password: event.target.password.value
      };

      props.login(credentials);

      // Clear Form
      event.target.username.value = '';
      event.target.password.value = '';
    } catch (exception) {
      // Invalid Credentials
      props.setFailureNotif('Wrong credentials.', 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    props.logout();
  };

  const loginForm = () => (
    <form id="login-form" onSubmit={handleLogin}>
      <h2>Log in to the Application</h2>
      <div>
        Username
        <input
          id="login-username"
          type="text"
          name="username"
        />
      </div>
      <div>
        Password
        <input
          id="login-password"
          type="password"
          name="password"
        />
      </div>
      <button id='login-button' type="submit">Login</button>
    </form>
  );

  const loggedInInterface = () => (
    <div>
      <h1>Blogs</h1>
      <form onSubmit={handleLogout}>
        {props.user.name} logged-in
        <button type="submit">Logout</button>
      </form>
      <Togglable id="create-blog-toggle-button" buttonLabel="Create New Blog" ref={createBlogFormRef}>
        <CreateBlogForm
          createBlogFormRef={createBlogFormRef}
        />
      </Togglable>
      <br></br>
      <BlogList />
    </div>
  );

  return (
    <div>
      {props.successMessage !== null && <Notification id="success-notification" message={props.successMessage} notificationStyle="successNotification" />}
      {props.failureMessage !== null && <Notification id="failure-notification" message={props.failureMessage} notificationStyle="failureNotification"/>}
      { props.user === null
        ? loginForm()
        : loggedInInterface()
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    successMessage: state.successNotif.text,
    failureMessage: state.failureNotif.text,
    blogs: state.blogs,
    user: state.user,
  };
};

const mapDispatchToProps = {
  initializeBlogs,
  loadLoggedUser,
  setFailureNotif,
  login,
  logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
