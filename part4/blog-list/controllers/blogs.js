/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const { body, user } = request;

    // User not Identified from Token
    if (!user) {
        response.status(401).json({ error: 'Token missing or invalid.' });
    }

    // All Fields Present
    if (body.title && body.url) {
        // Create New Blog Entry
        const blog = new Blog(
            {
                title: body.title,
                url: body.url,
                user: user._id,
            },
        );

        try {
            // Save Blog Entry
            const populatedBlog = await blog
                .populate('user', { username: 1, name: 1 });
            const savedBlog = await populatedBlog.save();

            // Update Author Blogs
            user.blogs = user.blogs.concat(savedBlog);
            await user.save();

            // Respond
            return response.status(201).json(savedBlog.toJSON());
        } catch (error) {
            return response.status(422).json({ error: 'Invalid Blog.' }).end();
        }
    } else {
        // Missing Fields in Blog Creation Request
        return response.status(400).json({ error: 'Missing fields.' }).end();
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

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    // Check for Valid Token
    const { user } = request;

    // User not Identified from Token
    if (!user) {
        return response.status(401).json({ error: 'Token missing or invalid.' });
    }
    // Check if Author Correct
    if (request.params.id) {
        try {
            const blog = await Blog
                .findById(request.params.id)
                .populate('user', { _id: 1 });

            // Check Ownership Match
            const matchingIds = (blog.user._id.toString() === user.id.toString());
            if (matchingIds) {
                await Blog.findOneAndDelete(
                    {
                        _id: request.params.id,
                    },
                );
                return response.status(204).end();
            }

            // Reject if not from Owner
            return response.status(401).json({ error: 'Invalid token.' });
        } catch (error) {
            return response.status(422).json({ error: 'Invalid content.' });
        }
    } else {
        // No Blog ID info
        return response.status(400).json({ error: 'Missing fields.' });
    }
});

module.exports = blogsRouter;
