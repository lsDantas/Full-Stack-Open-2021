import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {

  switch(action.type) {
  case 'INITIALIZE_BLOGS':
    return action.data;
  case 'ADD_BLOG': {
    const newBlog = action.data;
    return state.concat(newBlog);
  }
  case 'REMOVE_BLOG': {
    const removedBlog = action.data;
    const differentBlogs = (entry) => entry.id !== removedBlog.id;

    return state.filter(differentBlogs);
  }
  case 'LIKE': {
    const updatedBlog = action.data;

    const matchingBlogs = (blog) => (blog.id === updatedBlog.id) ? updatedBlog : blog;
    const byLikes = (blog1, blog2) => blog2.likes - blog1.likes;

    const updatedBlogs = state.map(matchingBlogs).sort(byLikes);

    return updatedBlogs;
  }
  default:
    return state;
  }

};

export const initializeBlogs = () => {
  return async dispatch => {
    // Fetch from Server
    const blogs = await blogService.getAll();

    // Sort by Descending Likes
    const byLikes = (blog1, blog2) => blog2.likes - blog1.likes;
    const sortedBlogs = blogs.sort(byLikes);

    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: sortedBlogs,
    });
  };
};

export const likeBlog = (blog) => {
  return async dispatch => {
    // Edit Blog
    const changedBlog = {
      id: blog.id,
      likes: blog.likes + 1,
    };

    // Update in Server
    const updatedBlog = await blogService.update(changedBlog);

    dispatch({
      type: 'LIKE',
      data: updatedBlog,
    });
  };
};

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog);

    dispatch({
      type: 'REMOVE_BLOG',
      data: blog,
    });
  };
};

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog);

    dispatch({
      type: 'ADD_BLOG',
      data: newBlog,
    });
  }
};

export default blogReducer;
