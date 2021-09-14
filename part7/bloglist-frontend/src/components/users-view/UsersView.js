import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom';

const UsersView = (props) => {
  const authorsCount = (counts, blog) => {
    const authorCount = counts[blog.user.username];

    return (authorCount !== undefined)
      ? {
        ...counts,
        [blog.user.username]: {
          name: blog.user.name,
          id: blog.user.id,
          count: authorCount.count + 1,
        }
      }
      : {
        ...counts,
        [blog.user.username]: {
          name: blog.user.name,
          id: blog.user.id,
          count: 1,
        }
      };
  };
  const authorsBlogFreq = props.blogs.reduce(authorsCount, {});
  const authorsData = Object.entries(authorsBlogFreq);

  const centeredText = {
    textAlign: 'center',
  };

  return (
    <Router>
      <div id="user-list">
        <h2>User List</h2>
        <table>
          <tbody>
            <tr>
              <th>User</th>
              <th>Blogs Created</th>
            </tr>
            {
              authorsData.map(([ key, value ]) => {
                return (
                  <tr key={key}>
                    <td style={centeredText}>
                      <Link to={`/users/${value.id}`}>{value.name}</Link>
                    </td>
                    <td style={centeredText}>{value.count}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  };
};

export default connect(mapStateToProps, null)(UsersView);
