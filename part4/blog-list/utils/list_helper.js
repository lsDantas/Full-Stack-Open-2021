const blog = require('../models/blog');

const dummy = (blogs) => {
    const dummyResult = 1;
    return dummyResult;
};

const totalLikes = (blogs) => {
    const reducer = (sum, entry) => sum + entry.likes;

    return blogs.reduce(reducer, 0);
};

module.exports = {
    dummy,
    totalLikes,
};
