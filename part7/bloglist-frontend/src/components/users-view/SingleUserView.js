import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import AddedBlogsList from './AddedBlogsList';
import NoUserFoundNote from './NoUserFoundNote';

const SingleUserView = (props) => {
  const id = useParams().id;
  const matchingBlogs = props.blogs.filter((blog) => blog.user.id === id);

  return (
    <div id="single-user-view">
      {
        (matchingBlogs.length === 0)
          ? <NoUserFoundNote />
          : <AddedBlogsList blogs={matchingBlogs}/>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  };
};

export default connect(mapStateToProps, null)(SingleUserView);
