const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./user_test_helper');

const api = supertest(app);
const jestTimetout = 200000;

const User = require('../models/user');

// Prepare Database for Tests
beforeEach(async () => {
    // Clear Database and Add Dummy Entries
    await User.deleteMany({});
    await User.insertMany(helper.initialUsers);
}, jestTimetout);

describe('On user creation...', () => {
    describe('Requests with missing fields are rejected.', () => {
        test('Missing username is rejected.', async () => {
            const incompleteUser = {
                name: 'James Bond',
                password: 'Martini',
            };
            const response = await api
                .post('/api/users')
                .send(incompleteUser);
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Missing fields.');
        });

        test('Missing name is rejected.', async () => {
            const incompleteUser = {
                username: '007',
                password: 'Martini',
            };
            const response = await api
                .post('/api/users')
                .send(incompleteUser);
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Missing fields.');
        });

        test('Missing password is rejected.', async () => {
            const incompleteUser = {
                username: '007',
                name: 'James Bond',
            };
            const response = await api
                .post('/api/users')
                .send(incompleteUser);
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Missing fields.');
        });
    });

    describe('Requests with invalid data are rejected.', () => {
        test('Username already in database is rejected.', async () => {
            const repeatedUser = {
                username: 'TheOrwell',
                name: 'Eric Blair',
                password: 'Catalonia',
            };
            const response = await api
                .post('/api/users')
                .send(repeatedUser);
            expect(response.status).toBe(422);
            expect(response.body.error).toBe('Invalid username.');
        });

        test('Username with less than 3 characters is rejected.', async () => {
            const invalidUser = {
                username: '7',
                name: 'James Bond',
                password: 'Martini',
            };
            const response = await api
                .post('/api/users')
                .send(invalidUser);
            expect(response.status).toBe(422);
            expect(response.body.error).toBe('Invalid username.');
        });

        test('Password with less than 3 characters is rejected.', async () => {
            const invalidUser = {
                username: '007',
                name: 'James Bond',
                password: 'MI',
            };
            const response = await api
                .post('/api/users')
                .send(invalidUser);
            expect(response.status).toBe(422);
            expect(response.body.error).toBe('Invalid password.');
        });
    });
});

// Post-Test Actions
afterAll(() => {
    mongoose.connection.close();
});
