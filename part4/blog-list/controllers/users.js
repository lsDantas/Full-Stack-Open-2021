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
                return response.json(savedUser.toJSON());
            } catch (error) {
                // Username in Use
                return response.status(422).json({ error: 'Invalid username.' }).end();
            }
        } else {
            // Password too Short
            return response.status(422).json({ error: 'Invalid password.' }).end();
        }
    } else {
        // Missing Fields in User Creation Request
        return response.status(422).json({ error: 'Missing fields.' }).end();
    }
});

usersRouter.get('/', async (request, response) => {
    const usersData = await User
        .find({}).populate('blogs', { title: 1, url: 1, likes: 1 });

    const users = usersData.map((user) => user.toJSON());
    return response.json(users);
});

module.exports = usersRouter;
