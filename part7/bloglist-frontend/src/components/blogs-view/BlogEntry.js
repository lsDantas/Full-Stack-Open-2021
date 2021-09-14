import React, { useState } from 'react';

import '../../index.css';

import BlogInfoCard from './BlogInfoCard';

const BlogEntry = ({ blog }) => {
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
      {visible === true && <BlogInfoCard blog={blog} />}
    </div>
  );
};

export default BlogEntry;