import React from 'react';

const CreateBlogForm = ({ 
    handleCreateBlog,
    setTitle,
    setAuthor,
    setUrl,
    title,
    author,
    url
    }) => {


    return (
    <form onSubmit={handleCreateBlog}>
        <h2>Create New Blog</h2>
        Title:
        <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
        />
        <br></br>
        Author:
        <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
        />
        <br></br>
        URL:
        <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
        />
        <br></br>
        <button type="submit">Create</button>
    </form>
    )
};

export default CreateBlogForm;