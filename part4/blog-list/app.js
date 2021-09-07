const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');

const app = express();

// Establish Database Connection
logger.info('Connecting to', config.MONGODB_URI);

// Connect to Database
const connectToDb = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error('Error connecting to MongoDB: ', error.message);
    }
};
connectToDb();

// Preprocessing
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

// Route Handling
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

// Error Handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
