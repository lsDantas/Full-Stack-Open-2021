import React, { useState, useEffect } from 'react';
import './index.css'
import Blog from './components/Blog';
import Notification from './components/Notification';
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

  // Fetch Blogs from back End
  useEffect(() => {
    blogService.getAll().then((receivedBlogs) => setBlogs(receivedBlogs));
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

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    const blog = {
      title, 
      author,
      url,
    };

    try {
      // Add Blog
      const newEntry = await blogService.create(blog);
      setBlogs(blogs.concat(newEntry));

      // Clear Form
      setTitle('');
      setAuthor('');
      setUrl('');

      // Show Success Notification
      setSuccessMessage(`Added ${newEntry.title} by ${newEntry.author}!`);
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000);
    } catch {
      setErrorMessage('Failed to add blog.');
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
    
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

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createBlogForm = () => (
    <form onSubmit={handleCreateBlog}>
      Title:
      <input 
        type="text"
        value={title}
        name="title"
        onChange={({ target }) => setTitle(target.value)}
      />
      <br></br>
      Author:
      <input
        type="text"
        value={author}
        name="author"
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br></br>
      URL:
      <input
        type="text"
        value={url}
        name="url"
        onChange={({ target }) => setUrl(target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );

  const blogsForm = () => (
    <div>
      <h2>Blogs</h2>
      {blogs.map((entry) => <Blog key={entry.id} blog={entry} />)}
    </div>
  );

  const loggedInInterface = () => (
    <div>
      <h1>Blogs</h1>
      <form onSubmit={handleLogout}>
        {user.name} logged-in
        <button type="submit">Logout</button>
      </form>
      <h2>Create New Blog</h2>
      {createBlogForm()}
      <br></br>
      {blogsForm()}
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
