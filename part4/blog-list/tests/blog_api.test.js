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
    // Clear Database
    await Blog.deleteMany({});
    console.log('Cleared database.');

    // Add Dummy Entries
    const blogObjects = helper.initialBlogs
        .map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
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

// Post-Test Actions
afterAll(() => {
    mongoose.connection.close();
});
