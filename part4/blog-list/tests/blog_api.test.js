const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const helper = require('./blog_test_helper');

const api = supertest(app);
const jestTimeout = 200000;

const User = require('../models/user');
const Blog = require('../models/blog');

// Prepare Database for Tests
beforeEach(async () => {
    // Clear Database
    await User.deleteMany({});
    await Blog.deleteMany({});

    // Prepare Dummy Users
    const hashPasswords = async ({ username, name, password }) => {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const userEntry = {
            username,
            name,
            passwordHash,
        };

        return userEntry;
    };
    const userPromises = helper.initialUsers.map(hashPasswords);
    const newUsers = await Promise.all(userPromises);

    // Add Dummy Users
    await User.insertMany(newUsers);

    // Fetch Dummy Users in Database
    const availableUsers = await helper.usersInDb();

    // Prepare Dummy Blogs
    const addAuthorsToBlogs = async (blog) => {
        const randomIndex = Math.floor(Math.random() * availableUsers.length);
        return { ...blog, user: availableUsers[randomIndex].id };
    };
    const blogPromises = helper.initialBlogs.map(addAuthorsToBlogs);
    const newBlogs = await Promise.all(blogPromises);

    // Add Dummy Blogs
    await Blog.insertMany(newBlogs);
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
            // Prepare Token
            const user = helper.initialUsers[0];

            const loginResponse = await api
                .post('/api/login')
                .send(user);
            const { token } = loginResponse.body;

            // Add New Entry
            const newEntry = {
                title: 'Sample Entry',
                author: 'No One',
                url: 'http://www.example.com',
            };
            const entryResponse = await api
                .post('/api/blogs')
                .send(newEntry)
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${token}`);

            const addedId = entryResponse.body.id;

            // Fetch Blogs and Identify New Entry
            const response = await api
                .get('/api/blogs');

            const matchingTitles = (blog) => blog.id === addedId;
            const matchingBlog = response.body.filter(matchingTitles).pop();

            expect(matchingBlog.likes).toBe(0);
        });

        test('Entry with missing title or url receives 400 Bad Request.', async () => {
            // Prepare Token
            const user = helper.initialUsers[0];

            const loginResponse = await api
                .post('/api/login')
                .send(user);
            const { token } = loginResponse.body;

            // Add Blog Entry
            const newEntry = {
                url: 'http://www.example.com',
                likes: 20,
            };

            const response = await api
                .post('/api/blogs')
                .send(newEntry)
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${token}`);

            expect(response.status).toBe(400);
        });

        test('Deleted entry successfully removed.', async () => {
            // Select Blog Entry and Find User
            const blogs = await helper.blogsInDb();
            const users = await helper.usersInDb();

            // Find User of Blog Entry
            const removedEntry = blogs.pop();
            const removedUserId = removedEntry.user.toString();

            // Find User in User Collection
            const matchingId = (user) => user.id === removedUserId;
            const userEntry = users.find(matchingId);

            // Match User with Password List
            const matchingUsername = (user) => user.username === userEntry.username;
            const user = helper.initialUsers.find(matchingUsername);

            // Prepare Token
            const loginResponse = await api
                .post('/api/login')
                .send(user);
            const { token } = loginResponse.body;

            // Remove Entry
            await api
                .delete(`/api/blogs/${removedEntry.id}`)
                .send(removedEntry)
                .set('Content-Type', 'application/json')
                .set('Authorization', `bearer ${token}`);

            const blogsAtEnd = await helper.blogsInDb();

            // Check if Entries Count Reduced
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);

            // Check if Removed Entry id still in Database
            const ids = blogsAtEnd.map((entry) => entry.id);
            expect(ids).not.toContain(removedEntry.id);
        }, jestTimeout);

        test('Updating an entry changes its contents.', async () => {
            // Create Updated Entry out of Dummy
            const entries = await helper.blogsInDb();
            const originalEntry = entries[0];
            const updatedEntry = { ...originalEntry, likes: originalEntry.likes + 1 };

            // Update Entry
            await api
                .put(`/api/blogs/${updatedEntry.id}`)
                .send(updatedEntry);

            // Get Current Entries
            const response = await api
                .get('/api/blogs');
            const matchingIds = (entry) => entry.id === updatedEntry.id;
            const entryInDb = response.body.filter(matchingIds).pop();

            expect(entryInDb.likes).toBe(updatedEntry.likes);
        });
    });
});

// Post-Test Actions
afterAll(() => {
    mongoose.connection.close();
});
