import React from 'react';
import { Link } from 'react-router-dom';

import '../../index.css';

const BlogEntry = ({ blog }) => {
  return (
    <div id={`blog-entry-${blog.id}`} className="blogStyle">
      <Link to={`/blogs/${blog.id}`}> {blog.title} - {blog.author} </Link>
    </div>
  );
};

export default BlogEntry;