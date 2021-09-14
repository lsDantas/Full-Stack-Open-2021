import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Bootstrap
import { Table } from 'react-bootstrap'

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
    <div id="user-list">
      <h2>User List</h2>
      <Table striped>
        <tbody>
          <tr>
            <th style={centeredText}>User</th>
            <th style={centeredText}>Blogs Created</th>
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
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  };
};

export default connect(mapStateToProps, null)(UsersView);
