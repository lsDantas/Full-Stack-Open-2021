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
        });
});

module.exports = blogsRouter;
