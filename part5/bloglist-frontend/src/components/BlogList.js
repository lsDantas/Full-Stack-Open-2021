import React, { useState } from 'react';

import '../index.css'

import blogService from '../services/blogs';

const BlogList = ({ blogs, setBlogs, setErrorMessage }) => {
  // Like Update Handler
  const likeUpdater = (blog) => {
    const updateHandler = async () => {
      // Edit Blog
      const newBlog = { id: blog.id, likes: blog.likes + 1 };

      try {
        // Update blogs in Server
        const updatedBlog = await blogService.update(newBlog);

        // Update Blogs Locally
        const matchingBlogs = (blog) => (blog.id === updatedBlog.id) ? updatedBlog : blog;
        const updatedBlogs = blogs.map(matchingBlogs);
        
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
      {blogs.map((blog) => <BlogEntry key={blog.id} blog={blog} updateHandler={likeUpdater(blog)} />)}
    </div>
  )
};

const BlogEntry = ({ blog, updateHandler}) => {
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
      {visible === true && <BlogInfoCard blog={blog} updateHandler={updateHandler} />}
    </div>
  ) 
};

const BlogInfoCard = ({ blog, updateHandler }) => (
    <div>
      {blog.url}
      <br></br>
      Likes {blog.likes}
    <button onClick={updateHandler}>Like</button>
      <br></br>
      {blog.user.name}
    </div>
);


export default BlogList;
