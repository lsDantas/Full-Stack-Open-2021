import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import './index.css';

// Components
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import BlogList from './components/blogs-view/BlogList';

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

  const handleLogout = (event) => {
    event.preventDefault();

    props.logout();
  };

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
      {props.successMessage !== null && <Notification class="successNotification" id="success-notification" message={props.successMessage} notificationStyle="successNotification" />}
      {props.failureMessage !== null && <Notification class="failureNotification" id="failure-notification" message={props.failureMessage} notificationStyle="failureNotification"/>}
      { props.user === null
        ? <LoginForm />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
