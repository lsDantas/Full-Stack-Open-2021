import React, { useState, useEffect, useRef } from 'react';
import './index.css'

// Components
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import CreateBlogForm from './components/CreateBlogForm'

// Services
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // Notifications
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // References
  const createBlogFormRef = useRef();

  // Fetch Blogs from Back End
  useEffect(() => {
    // Sort comparison Function - Descending Likes
    const byLikes = (blog1, blog2) => blog2.likes - blog1.likes;

    blogService
      .getAll()
      .then((receivedBlogs) => receivedBlogs.sort(byLikes))
      .then((receivedBlogs) => setBlogs(receivedBlogs));
  }, []);

  // Check for Logged-In User
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // Forms
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Attempt Login
      const user = await loginService.login({
        username, password
      });

      // Save User
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);

      // Clear Form
      setUsername('');
      setPassword('');
    } catch (exception) {
      // Invalid Credentials
      setErrorMessage('Wrong credentials.');
      setTimeout(() => { 
        setErrorMessage(null) 
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to the Application</h2>
      <div>
        Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const loggedInInterface = () => (
    <div>
      <h1>Blogs</h1>
      <form onSubmit={handleLogout}>
        {user.name} logged-in
        <button type="submit">Logout</button>
      </form>
      <Togglable buttonLabel="Create New Blog" ref={createBlogFormRef}>
        <CreateBlogForm 
          blogs={blogs}
          handleBlogUpdate={setBlogs}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          createBlogFormRef={createBlogFormRef}
        />
      </Togglable>
      <br></br>
      <BlogList blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} user={user} />
    </div>
  );

  return (
    <div>
      {successMessage !== null && <Notification message={successMessage} notificationStyle="successNotification" />}
      {errorMessage !== null && <Notification message={errorMessage} notificationStyle="failureNotification"/>}
      { user === null
        ? loginForm()
        : loggedInInterface()
      }
    </div>
  );
};

export default App;
