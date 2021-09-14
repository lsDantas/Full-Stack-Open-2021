import React from 'react';
import { connect } from 'react-redux';
import { createBlog } from '../../reducers/blogsReducer';
import { setSuccessNotif } from '../../reducers/successNotifReducer';
import { setFailureNotif } from '../../reducers/failureNotifReducer';

const CreateBlogForm = (props) => {

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    const blog = {
      title: event.target.titleText.value,
      author: event.target.authorText.value,
      url: event.target.urlText.value,
    };
    try {
      await props.createBlog(blog);

      props.createBlogFormRef.current.toggleVisibility();
      props.setSuccessNotif(`Added ${blog.title} by ${blog.author}!`);
    } catch (exception) {
      props.setFailureNotif('Unable to create blog.');
    }
  };

  return (
    <form id="create-blog-form" onSubmit={handleCreateBlog}>
      <h2>Create New Blog</h2>
      <FieldEntry id="create-blog-title" classRef="Title" refName="titleText" />
      <FieldEntry id="create-blog-author" classRef="Author" refName="authorText" />
      <FieldEntry id="create-blog-url" classRef="URL" refName="urlText" />
      <button id="create-blog-button" className="createButton" type="submit">Create</button>
    </form>
  );
};

const FieldEntry = ({ id, classRef, refName, }) => (
  <div>
    {classRef}
    <input
      id={id}
      className={classRef}
      type="text"
      name={refName}
    />
  </div>
);

const mapDispatchToProps = {
  createBlog,
  setSuccessNotif,
  setFailureNotif,
};

export default connect(null, mapDispatchToProps)(CreateBlogForm);