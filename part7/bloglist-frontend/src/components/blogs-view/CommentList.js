import React from 'react';
import { connect } from 'react-redux';

import { addComment } from '../../reducers/blogsReducer';
import { setSuccessNotif } from '../../reducers/successNotifReducer';
import { setFailureNotif } from '../../reducers/failureNotifReducer';

const CommentList = (props) => {
  const handleAddComment = async (event) => {
    event.preventDefault();

    try {
      const newComment = event.target.newCommentBox.value;
      console.log(newComment);
      await props.addComment(props.blog, newComment);

      event.target.newCommentBox.value = '';
    } catch (exception) {
      props.setFailureNotif('Unable to add comment.');
    }
  }

  return (
    <div>
      <h2>Comments</h2>
      <form id='add-comment-form' onSubmit={handleAddComment}>
        <input name="newCommentBox" type="text" />
        <button id="add-comment-button" type="submit">Add Comment</button>
      </form>
      {
        (props.blog.comments.length === 0)
          ? <h3>No comments yet.</h3>
          : <ul>
            {props.blog.comments.map((comment, index) =>
              <li key={`comment-${index}`}>{comment}</li>)}
          </ul>
      }
    </div>
  )
};

const mapDispatchToProps = {
  addComment,
  setSuccessNotif,
  setFailureNotif,
}

export default connect(null, mapDispatchToProps)(CommentList);
