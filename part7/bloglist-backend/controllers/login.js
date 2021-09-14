/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
    const { body } = request;

    // Compare Password Hashes
    const user = await User.findOne({ username: body.username });
    const passwordCorrect = user == null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash);

    // No User or Password Incorrect
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'Invalid username or password.',
        }).end();
    }

    // Generate Token
    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60 * 60 },
    );

    // Send Token
    return response
        .status(200)
        .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
