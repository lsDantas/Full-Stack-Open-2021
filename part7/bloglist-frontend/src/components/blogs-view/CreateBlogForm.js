import React from 'react';
import { connect } from 'react-redux';

// Bootstrap
import { Button, Form } from 'react-bootstrap';

// Reducers
import { createBlog } from '../../reducers/blogsReducer';
import { setSuccessNotif } from '../../reducers/successNotifReducer';
import { setFailureNotif } from '../../reducers/failureNotifReducer';

const CreateBlogForm = (props) => {
  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    const blog = {
      title: formDataObj.titleText,
      author: formDataObj.authorText,
      url: formDataObj.urlText,
    };

    try {
      await props.createBlog(blog);

      props.createBlogFormRef.current.toggleVisibility();
      props.setSuccessNotif(`Added ${blog.title} by ${blog.author}!`);

      event.target.titleText.value = '';
      event.target.authorText.value = '';
      event.target.urlText.value = '';
    } catch (exception) {
      props.setFailureNotif('Unable to create blog.');
    }
  };

  return (
    <Form id="create-blog-form" onSubmit={handleCreateBlog}>
      <h2>Create New Blog</h2>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control name="titleText" type="text" placeholder="Enter title" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control name="authorText" type="text" placeholder="Enter author" />
      </Form.Group>
      <Form.Group>
        <Form.Label>URL</Form.Label>
        <Form.Control name="urlText" type="text" placeholder="Enter URL" />
      </Form.Group>
      <Button id="create-blog-button" className="createButton" type="submit">Create</Button>
    </Form>
  );
};

const mapDispatchToProps = {
  createBlog,
  setSuccessNotif,
  setFailureNotif,
};

export default connect(null, mapDispatchToProps)(CreateBlogForm);