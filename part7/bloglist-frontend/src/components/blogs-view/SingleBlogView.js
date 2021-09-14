import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import BlogInfoCard from './BlogInfoCard';

const SingleBlogView = (props) => {
  const id = useParams().id;
  const matchingBlogs = props.blogs.filter((blog) => blog.id === id);

  return(
    <div id="single-blog-view">
      {
        (matchingBlogs.length === 0)
          ? <h2>No blog found.</h2>
          : <div>
            <h2>{matchingBlogs[0].title}</h2>
            <BlogInfoCard key={matchingBlogs[0].id} blog={matchingBlogs[0]}/>
          </div>
      }
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  };
};

export default connect(mapStateToProps, null)(SingleBlogView);
