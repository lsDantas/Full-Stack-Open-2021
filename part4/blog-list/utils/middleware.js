const logger = require('./logger');

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method);
    logger.info('Path: ', request.path);
    logger.info('Body: ', request.body);
    logger.info('---');

    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    // Known Error Types
    switch (error.name) {
        case 'CastError':
            return response.status(400).send({ error: 'Malformatted id' });
        case 'ValidationError':
            return response.status(400).json({ error: error.message });
        default:
            // No Clue
            return next(error);
    }
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
};