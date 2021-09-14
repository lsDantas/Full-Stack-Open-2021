import React from 'react';
import { connect } from 'react-redux';

import BlogsView from './blogs-view/BlogsView';

import { logout } from '../reducers/userReducer';

const LoggedInterface = (props) => {
  const handleLogout = (event) => {
    event.preventDefault();

    props.logout();
  };

  return (
    <div>
      <h1>Blogs</h1>
      <form onSubmit={handleLogout}>
        {props.user.name} logged-in
        <button type="submit">Logout</button>
      </form>
      <BlogsView />
    </div>
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
