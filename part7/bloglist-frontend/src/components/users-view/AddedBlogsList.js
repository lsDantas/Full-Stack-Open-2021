import React from 'react';

// Bootstrap
import { ListGroup } from 'react-bootstrap'

const AddedBlogsList = (props) => (
  <div id="added-blog-list">
    <h2>{props.blogs[0].user.name}</h2>
    <h3>Added Blogs</h3>
    <ListGroup>
      {
        props.blogs.map((blog) => <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>)
      }
    </ListGroup>
  </div>
);

export default AddedBlogsList;
