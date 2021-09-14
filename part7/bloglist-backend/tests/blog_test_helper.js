const User = require('../models/user');
const Blog = require('../models/blog');

const initialUsers = [
    {
        username: 'TheOrwell',
        name: 'George Orwell',
        password: '1984',
    },
    {
        username: 'Roach',
        name: 'Franz Kafka',
        password: 'Off2Amerika',
    },
    {
        username: 'SoItGoes',
        name: 'Kurt Vonnegut',
        password: 'aliensabductedme',
    },
];

const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 15,
        __v: 0,
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 12,
        __v: 0,
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 5,
        __v: 0,
    },
];

const nonExistingId = async () => {
    const blog = new Blog(
        {
            title: 'Quick Removal',
            author: 'No One',
            url: 'http://www.example.com',
        },
    );
    await blog.save();
    await blog.removed();

    // eslint-disable-next-line no-underscore-dangle
    return blog._id.toString();
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map((user) => user.toJSON());
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

module.exports = {
    initialUsers, initialBlogs, nonExistingId, usersInDb, blogsInDb,
};
