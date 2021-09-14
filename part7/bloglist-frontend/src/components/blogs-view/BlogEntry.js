import React from 'react';
import { Link } from 'react-router-dom';

import '../../index.css';

const BlogEntry = ({ blog }) => {
  return (
    <tr id={`blog-entry-${blog.id}`} className="blogStyle">
      <td><Link to={`/blogs/${blog.id}`}> {blog.title} - {blog.author} </Link></td>
    </tr>
  );
};

export default BlogEntry;