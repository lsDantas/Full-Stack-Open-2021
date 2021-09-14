import React from 'react';
import { connect } from 'react-redux';

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
      <a href={props.blog.url}>{props.blog.url}</a>
      <br></br>
      Likes <div className='likes'>{props.blog.likes}</div>
      <button className="likeButton" onClick={handleLikeBlog}>Like</button>
      <br></br>
      {props.blog.user.name}
      <br></br>
      {(props.blog.user.username === props.user.username) && <button onClick={handleRemoveBlog}>Remove</button>}
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
