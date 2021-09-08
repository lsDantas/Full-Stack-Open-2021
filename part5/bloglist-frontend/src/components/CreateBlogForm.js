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
        <FieldEntry name="Title" value={title} changeHandler={setTitle} />
        <FieldEntry name="Author" value={author} changeHandler={setAuthor} />
        <FieldEntry name="URL" value={url} changeHandler={setUrl} />
        <button type="submit">Create</button>
    </form>
    )
};

const FieldEntry = ({name, value, changeHandler}) => (
    <div>
        {name}
        <input
            type="text"
            value={value}
            name={name}
            onChange={({ target }) => changeHandler(target.value)}
        />
    </div>
);

export default CreateBlogForm;