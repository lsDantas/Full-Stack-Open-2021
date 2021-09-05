const blog = require('../models/blog');

const dummy = (blogs) => {
    const dummyResult = 1;
    return dummyResult;
};

const totalLikes = (blogs) => {
    const reducer = (sum, entry) => sum + entry.likes;

    return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
    // Calculate for Valid Lists
    if (blogs.length > 0) {
        const reducer = (mostLiked, entry) => (entry.likes > mostLiked.likes ? entry : mostLiked);

        return blogs.reduce(reducer);
    }
    console.log("Here");
    return undefined;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
};
