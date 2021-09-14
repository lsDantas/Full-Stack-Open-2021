import React from 'react';
import { connect } from 'react-redux';

import '../index.css';

import BlogEntry from './BlogEntry';


const BlogList = (props) => {
  return (
    <div id="blog-list">
      <h2>Blogs</h2>
      {props.blogs.map((blog) => <BlogEntry key={blog.id} blog={blog} />)}
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

export default connect(mapStateToProps, null)(BlogList);
