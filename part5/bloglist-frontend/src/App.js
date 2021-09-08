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
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch Blogs from back End
  useEffect(() => {
    blogService.getAll().then((receivedBlogs) => setBlogs(receivedBlogs));
  }, []);

  // Forms
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Attempt Login
      const user = await loginService.login({
        username, password
      });
      setUser(user);
    } catch (exception) {
      // Invalid Credentials
      setErrorMessage('Wrong credentials.');
      setTimeout(() => { 
        setErrorMessage(null) 
      }, 5000);
    }
    setUsername('');
    setPassword('');
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

  const blogsForm = () => (
    <div>
      <h2>Blogs</h2>
      {blogs.map((entry) => <Blog key={entry.id} blog={entry} />)}
    </div>
  );

  return (
    <div>
      {errorMessage !== null && <Notification message={errorMessage} notificationStyle="failureNotification"/>}
      { user === null
        ? loginForm()
        : (
          <div>
            <p>
              {user.name} logged-in
            </p>
            <br></br>
            {blogsForm()}
          </div>
        )}
    </div>
  );
};

export default App;
