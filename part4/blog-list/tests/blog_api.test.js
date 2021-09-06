/* eslint-disable no-console */

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./blog_test_helper');

const api = supertest(app);
const jestTimeout = 200000;

const Blog = require('../models/blog');

// Prepare Database for Tests
beforeEach(async () => {
    // Clear Database and Add Dummy Entries
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
}, jestTimeout);

// Tests
describe('When there are a few entries available...', () => {
    test('Returns correct amount of blog posts in JSON format.', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body).toHaveLength(helper.initialBlogs.length);
    }, jestTimeout);

    test('Blog entries are identified by "id" rather than "_id".', async () => {
        const response = await api
            .get('/api/blogs');

        const blogs = response.body;
        const blogIds = (blog) => blog.id;
        expect(blogs.map(blogIds)).toBeDefined();
    });

    describe('For a single entry...', () => {
        test('Entry is added correctly.', async () => {
            // Add New Entry
            const blog = new Blog(
                {
                    title: 'Sample Entry',
                    author: 'No One',
                    url: 'http://www.example.com',
                },
            );
            await blog.save();

            const blogsAtEnd = await helper.blogsInDb();

            // Check for Appropriate Length
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

            // Check for Matching Title
            const titles = blogsAtEnd.map((entry) => entry.title);
            expect(titles).toContain(blog.title);
        });

        test('Entry without a "likes" property have 0 likes.', async () => {
            // Add New Entry
            const newEntry = new Blog(
                {
                    title: 'Sample Entry',
                    author: 'No One',
                    url: 'http://www.example.com',
                },
            );
            await newEntry.save();

            // Fetch Blogs and Identify New Entry
            const response = await api
                .get('/api/blogs');
            const matchingTitles = (blog) => blog.title === newEntry.title;
            const matchingBlog = response.body.filter(matchingTitles).pop();

            expect(matchingBlog.likes).toBe(0);
        });

        test('Entry with missing title or url receives 404 Bad Request.', async () => {
            const newEntry = new Blog(
                {
                    author: 'No One',
                    likes: '0',
                },
            );

            const response = await api
                .post('/api/blogs')
                .send(newEntry)
                .set('Content-Type', 'application/json');

            expect(response.status).toBe(400);
        });

        test('Deleted entry successfully removed.', async () => {
            // Remove First Entry
            const removedEntry = helper.initialBlogs[0];
            await api
                .delete('/api/blogs')
                .send(removedEntry);

            const blogsAtEnd = await helper.blogsInDb();

            // Check if Entries Count Reduced
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

            // Check if Removed Entry id still in Database
            const ids = blogsAtEnd.map((entry) => entry.id);
            expect(ids).not.toContain(removedEntry.ids);
        }, jestTimeout);
    });
});

// Post-Test Actions
afterAll(() => {
    mongoose.connection.close();
});
