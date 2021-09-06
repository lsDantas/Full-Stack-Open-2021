const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

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

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then((blogs) => {
            const entries = blogs.map((blog) => blog.toJSON());
            response.json(entries);
        });
});

blogsRouter.put('/:id', async (request, response, next) => {
    const updatedEntry = request.body;

    try {
        const resultingEntry = await Blog
            .findByIdAndUpdate(request.params.id, updatedEntry, { new: true });
        response.json(resultingEntry.toJSON());
    } catch (error) {
        next(error);
    }
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
