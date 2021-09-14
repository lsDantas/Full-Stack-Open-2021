import React from 'react';
import { connect } from 'react-redux';

// Bootstrap
import { Button } from 'react-bootstrap'

import CommentList from './CommentList';

import { setFailureNotif } from '../../reducers/failureNotifReducer';
import { likeBlog, removeBlog } from '../../reducers/blogsReducer';

const BlogInfoCard = (props) => {

  const handleLikeBlog = async () => {
    try {
      await props.likeBlog(props.blog)
    } catch (exception) {
      props.setFailureNotif('Unable to update likes.');
    }
  };

  const handleRemoveBlog = async () => {
    // Get user confirmation
    const userApproval = window.confirm(`Are you sure you want to delete ${props.blog.title} by ${props.blog.author}?`);

    if (userApproval) {
      try {
        await props.removeBlog(props.blog);
      } catch (exception) {
        props.setFailureNotif('Unable to delete blog.');
      }
    }
  }

  return (
    <div className="blogInfoCard">
      URL: <a href={props.blog.url}>{props.blog.url}</a>
      <br></br>
      <div className='likes'>Likes {props.blog.likes}</div>
      <Button className="likeButton" onClick={handleLikeBlog}>Like</Button>
      <br></br>
      User: {props.blog.user.name}
      <br></br>
      {(props.blog.user.username === props.user.username) && <Button onClick={handleRemoveBlog}>Remove Blog</Button>}
      <CommentList blog={props.blog} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
};

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  setFailureNotif,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogInfoCard);
