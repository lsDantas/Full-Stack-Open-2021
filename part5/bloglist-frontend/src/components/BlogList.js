import React, { useState } from 'react';

import '../index.css'

const BlogList = ({ blogs }) => (
  <div>
    <h2>Blogs</h2>
    {blogs.map((entry) => <BlogEntry key={entry.id} blog={entry} />)}
  </div>
);

const BlogEntry = ({ blog }) => { 
  const [visible, setVisible] = useState(false);

  const toggleLabel = visible ? 'Hide' : 'Show';

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  
  return (
    <div className="blogStyle">
      {blog.title} - {blog.author}
      <button onClick={toggleVisibility}>{toggleLabel}</button>
      {visible === true && blogInfoCard(blog)}
    </div>
  ) 
};

const blogInfoCard = (blog) => (
  <div>
    {blog.url}
    <br></br>
    Likes {blog.likes}
    <button>Like</button>
    <br></br>
    {blog.user.name}
  </div>
);


export default BlogList;
