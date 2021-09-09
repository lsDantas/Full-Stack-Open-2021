import React, { useState } from 'react';

import '../index.css';

import blogService from '../services/blogs';

const BlogList = ({ blogs, setBlogs, setErrorMessage, user }) => {
  // Removal Handler
  const blogRemover = (blog) => {
    const removalHandler = async () => {
      const userApproval = window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`);

      if (userApproval) {
        try {
          await blogService.remove(blog);

          const differentBlogs = (entry) => entry.id !== blog.id;
          const remainingBlogs = blogs.filter(differentBlogs);
          setBlogs(remainingBlogs);
        } catch (exception) {
          // Update Failed
          setErrorMessage('Unable to delete blog.');
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        }
      }
    }

    return removalHandler;
  }

  // Like Update Handler
  const likeUpdater = (blog) => {
    const updateHandler = async () => {
      // Edit Blog
      const newBlog = { id: blog.id, likes: blog.likes + 1 };

      try {
        // Update Blogs
        const updatedBlog = await blogService.update(newBlog);

        const matchingBlogs = (blog) => (blog.id === updatedBlog.id) ? updatedBlog : blog;
        const byLikes = (blog1,blog2) => blog2.likes - blog1.likes;

        const updatedBlogs = blogs
          .map(matchingBlogs)
          .sort(byLikes);

        setBlogs(updatedBlogs);
      } catch (exception) {
        // Update Failed
        setErrorMessage('Unable to update likes.');
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      }
    }

    return updateHandler;
  };

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => <BlogEntry key={blog.id} blog={blog} updateHandler={likeUpdater(blog)} removalHandler={blogRemover(blog)} user={user} />)}
    </div>
  )
};

const BlogEntry = ({ blog, updateHandler, removalHandler, user }) => {
  // Info Card Visibility
  const [visible, setVisible] = useState(false);
  const toggleLabel = visible ? 'Hide' : 'Show';

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="blogStyle">
      {blog.title} - {blog.author}
      <button onClick={toggleVisibility}>{toggleLabel}</button>
      {visible === true && <BlogInfoCard blog={blog} updateHandler={updateHandler} removalHandler={removalHandler} user={user} />}
    </div>
  );
};

const BlogInfoCard = ({ blog, updateHandler, removalHandler, user }) => (
  <div>
    {blog.url}
    <br></br>
    Likes {blog.likes}
    <button onClick={updateHandler}>Like</button>
    <br></br>
    {blog.user.name}
    <br></br>
    {(blog.user.username === user.username) && <button onClick={removalHandler}>Remove</button>}
  </div>
);

export default BlogList;
