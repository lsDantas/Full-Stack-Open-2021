import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // Fetch Blogs from back End
  useEffect(() => {
    blogService.getAll().then((receivedBlogs) => setBlogs(receivedBlogs));
  }, []);

  // Forms
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      });
    } catch (exception) {

    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
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

  return (
    <div>
      { user === null
        ? loginForm()
        : (
          <div>
            <p>
              {user.name}
              logged-in
            </p>
          </div>
        )}
      <br />
      <div>
        <h2>blogs</h2>
        {blogs.map((entry) => <Blog key={entry.id} blog={entry} />)}
      </div>
    </div>
  );
};

export default App;
