import React, { useRef } from 'react';

import '../../index.css';

// Components
import Togglable from '../Togglable';
import CreateBlogForm from './CreateBlogForm';
import BlogList from './BlogList';

const BlogsView = () => {
  // References
  const createBlogFormRef = useRef();

  return (
    <div>
      <Togglable id="create-blog-toggle-button" buttonLabel="Create New Blog" ref={createBlogFormRef}>
        <CreateBlogForm
          createBlogFormRef={createBlogFormRef}
        />
      </Togglable>
      <br></br>
      <BlogList />
    </div>
  );
};

export default BlogsView;
