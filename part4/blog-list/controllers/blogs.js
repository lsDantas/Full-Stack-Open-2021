const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then((blogs) => {
            const entries = blogs.map((blog) => blog.toJSON());
            response.json(entries);
        });
});

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body);

    blog
        .save()
        .then((result) => {
            response.status(201).json(result.toJSON());
        })
        .catch(() => {
            response.status(400).json({ error: 'Fields missing.' });
        });
});

blogsRouter.delete('/', (request, response) => {
    const removedBlog = new Blog(request.body);

    Blog
        .deleteOne(removedBlog)
        .then(() => {
            response.status(204).end();
        });
});

module.exports = blogsRouter;
