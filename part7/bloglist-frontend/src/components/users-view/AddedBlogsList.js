import React from 'react';

const AddedBlogsList = (props) => (
  <div>
    <h2>{props.blogs[0].user.name}</h2>
    <h3>Added Blogs</h3>
    <ul>
      {
        props.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
      }
    </ul>
  </div>
);

export default AddedBlogsList;
