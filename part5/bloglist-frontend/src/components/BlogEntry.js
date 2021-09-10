import React, { useState } from 'react';

import '../index.css';

const BlogEntry = ({ blog, updateHandler, removalHandler, user }) => {
  // Info Card Visibility
  const [visible, setVisible] = useState(false);
  const toggleLabel = visible ? 'Hide' : 'Show';

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div id={`blog-entry-${blog.id}`} className="blogStyle">
      {blog.title} - {blog.author}
      <button id={`show-button-${blog.id}`} className="showBlogButton" onClick={toggleVisibility}>{toggleLabel}</button>
      {visible === true && <BlogInfoCard blog={blog} updateHandler={updateHandler} removalHandler={removalHandler} user={user} />}
    </div>
  );
};

const BlogInfoCard = ({ blog, updateHandler, removalHandler, user }) => (
  <div className="blogInfoCard">
    {blog.url}
    <br></br>
    Likes <div className='likes'>{blog.likes}</div>
    <button className="likeButton" onClick={updateHandler}>Like</button>
    <br></br>
    {blog.user.name}
    <br></br>
    {(blog.user.username === user.username) && <button onClick={removalHandler}>Remove</button>}
  </div>
);

export default BlogEntry;