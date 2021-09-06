/* eslint-disable no-console */

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./blog_test_helper');

const api = supertest(app);
const jestTimeout = 200000;

const Blog = require('../models/blog');
const blogsRouter = require('../controllers/blogs');

// Prepare Database for Tests
beforeEach(async () => {
    // Clear Database
    await Blog.deleteMany({});
    console.log('Cleared database.');

    // Add Dummy Entries
    await Blog.insertMany(helper.initialBlogs);
    console.log('Dummy entries saved');

    console.log('Test database ready!');
}, jestTimeout);

// Tests
test('Returns correct amount of blog posts in JSON format', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
}, jestTimeout);

test('Blog entries are identified by "id" rather than "_id"', async () => {
    const response = await api
        .get('/api/blogs');

    const blogs = response.body;
    const blogIds = (blog) => blog.id;
    expect(blogs.map(blogIds)).toBeDefined();
});

// Post-Test Actions
afterAll(() => {
    mongoose.connection.close();
});
