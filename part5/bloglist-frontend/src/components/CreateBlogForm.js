import React, { useState } from 'react';

import blogService from '../services/blogs';

const CreateBlogForm = ( { 
        blogs, 
        handleBlogUpdate, 
        setSuccessMessage,
        setErrorMessage,
        createBlogFormRef
    }) => {
    
    // Form State
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleCreateBlog = async (event) => {
        event.preventDefault();

        const blog = {
            title,
            author,
            url,
        };

        try {
            // Add Blog
            const newEntry = await blogService.create(blog);
            handleBlogUpdate(blogs.concat(newEntry));

            // Clear Form
            setTitle('');
            setAuthor('');
            setUrl('');

            // Show Success Notification
            setSuccessMessage(`Added ${newEntry.title} by ${newEntry.author}!`);
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000);

            createBlogFormRef.current.toggleVisibility();
        } catch {
            setErrorMessage('Failed to add blog.');
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
        }

    };


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