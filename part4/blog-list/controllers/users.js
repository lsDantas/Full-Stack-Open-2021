const bcrypt = require('bcrypt');

const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
    const { body } = request;

    // All Fields Present
    if (body.username && body.name && body.password) {
        // Valid Password
        if (body.password.length >= 3) {
            // Generate Hash
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(body.password, saltRounds);

            // Prepare User
            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash,
            });

            // Save User
            try {
                const savedUser = await user.save();
                response.json(savedUser.toJSON());
            } catch (error) {
                // Username in Use
                response.status(422).send({ error: 'Invalid username.' });
            }
        } else {
            // Password too Short
            response.status(422).send({ error: 'Invalid password.' });
        }
    } else {
        // Missing Fields in User Creation Request
        response.status(422).send({ error: 'Missing fields.' });
    }
});

usersRouter.get('/', async (request, response) => {
    const usersData = await User.find({});

    const users = usersData.map((user) => user.toJSON());
    response.json(users);
});

module.exports = usersRouter;
