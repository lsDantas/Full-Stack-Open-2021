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
    return undefined;
};

const mostBlogs = (blogs) => {
    // Determine Author Frequencies
    const authorsFreqReducer = (authors, entry) => {
        const updatedCount = (authors[entry.author] === undefined)
            ? 1
            : Number(authors[entry.author]) + 1;

        return { ...authors, [entry.author]: updatedCount };
    };
    const authorsFreqDict = blogs.reduce(authorsFreqReducer, {});
    const authorsFreq = Object.entries(authorsFreqDict);

    // Determine Top Author
    const mostsBlogsReducer = ((topBlogger, [name, freq]) => {
        const newTop = (freq > topBlogger.blogs)
            ? { author: name, blogs: Number(freq) }
            : topBlogger;

        return newTop;
    });

    const noAuthor = { author: undefined, blogs: 0 };
    const topBlogger = authorsFreq.reduce(mostsBlogsReducer, noAuthor);

    return topBlogger;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
};
