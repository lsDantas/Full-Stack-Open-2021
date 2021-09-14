import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import BlogsView from './blogs-view/BlogsView';
import SingleBlogView from './blogs-view/SingleBlogView';
import UsersView from './users-view/UsersView';

// Reducers
import { logout } from '../reducers/userReducer';
import SingleUserView from './users-view/SingleUserView';

const LoggedInterface = (props) => {
  const handleLogout = (event) => {
    event.preventDefault();

    props.logout();
  };

  return (
    <Router>
      <div>
        <h1>Blogs App</h1>
        <form id="navbar" onSubmit={handleLogout}>
          <Link to="/blogs/">Blogs</Link>&nbsp;
          <Link to="/users/">Users</Link>&nbsp;
          {props.user.name} logged-in
          <button type="submit">Logout</button>
        </form>
        <br></br>
        <Switch>
          <Route path="/blogs/:id">
            <SingleBlogView />
          </Route>
          <Route path="/users/:id">
            <SingleUserView />
          </Route>
          <Route path="/users">
            <UsersView />
          </Route>
          <Route path="/">
            <BlogsView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInterface);
