import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';
import { connect } from 'react-redux';

// Bootstrap
import { Button, Navbar, Container, Nav } from 'react-bootstrap'

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
        <Navbar bg="primary" variant="dark">
          <Container>
            <Nav className="me-auto">
              <Nav.Link href="/blogs/">Blogs</Nav.Link>
              <Nav.Link href="/users/">Users</Nav.Link>
            </Nav>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {props.user.name} logged-in
              </Navbar.Text>
              <Button onClick={handleLogout} type="submit">Logout</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>

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
