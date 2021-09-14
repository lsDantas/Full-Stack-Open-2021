import React from 'react';
import { connect } from 'react-redux';

// Bootstrap
import { Button, Form, ListGroup } from 'react-bootstrap'

import { addComment } from '../../reducers/blogsReducer';
import { setSuccessNotif } from '../../reducers/successNotifReducer';
import { setFailureNotif } from '../../reducers/failureNotifReducer';

const CommentList = (props) => {
  const handleAddComment = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    try {
      const newComment = formDataObj.commentText;
      await props.addComment(props.blog, newComment);

      event.target.commentText.value = '';
    } catch (exception) {
      console.log(exception);
      props.setFailureNotif('Unable to add comment.');
    }
  }

  return (
    <div>
      <br></br>
      <h3>Add a comment</h3>
      <Form id='add-comment-form' onSubmit={handleAddComment}>
        <Form.Group>
          <Form.Control name="commentText" type="text" placeholder="Type a comment"></Form.Control>
        </Form.Group>
        <Button id="add-comment-button" type="submit">Add Comment</Button>
      </Form>
      <br></br>
      <h3>Comments</h3>
      {
        (props.blog.comments.length === 0)
          ? <b>No comments yet.</b>
          : <ListGroup>
            {props.blog.comments.map((comment, index) =>
              <ListGroup.Item key={`comment-${index}`}>
                {comment}
              </ListGroup.Item>)}
          </ListGroup>
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
