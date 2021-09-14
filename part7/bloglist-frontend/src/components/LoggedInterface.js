import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';
import { connect } from 'react-redux';

import BlogsView from './blogs-view/BlogsView';
import UsersView from './users-view/UsersView';

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
        <form onSubmit={handleLogout}>
          {props.user.name} logged-in
          <button type="submit">Logout</button>
        </form>
        <Switch>
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
