/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.post('/', async (request, response) => {
    const { body } = request;

    // All Fields Present
    if (body.title && body.url && body.likes !== undefined) {
        // Randomly Select Author
        const authors = await User.find({});
        const selectedAuthor = authors.pop();

        // Create New Blog Entry
        const blog = new Blog(
            {
                title: body.title,
                url: body.url,
                likes: body.likes,
                user: selectedAuthor._id,
            },
        );

        try {
            // Save Blog Entry
            const populatedBlog = await blog
                .populate('user', { username: 1, name: 1 });
            const savedBlog = await populatedBlog.save();

            // Update Author Blogs
            selectedAuthor.blogs = selectedAuthor.blogs.concat(savedBlog);
            await selectedAuthor.save();

            // Respond
            return response.status(201).json(savedBlog.toJSON());
        } catch (error) {
            return response.status(422).json({ error: 'Invalid Blog.' }).end();
        }
    } else {
        // Missing Fields in Blog Creation Request
        return response.status(422).json({ error: 'Missing fields.' }).end();
    }
});

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 });

    const entries = blogs.map((blog) => blog.toJSON());
    return response.json(entries);
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
