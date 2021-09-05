const listHelper = require('../utils/list_helper');

test('Dummy returns one.', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe('Total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
    ];

    const listWithThreeBlogs = [
        {
            _id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
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

    test('of empty list is zero.', () => {
        const result = listHelper.totalLikes([]);
        expect(result).toBe(0);
    });

    test('when list only has one blog, equals the likes of that.', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });

    test('of a bigger list is calculated correctly.', () => {
        const result = listHelper.totalLikes(listWithThreeBlogs);
        expect(result).toBe(24);
    });
});

describe('Favorite blog', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
    ];

    const listWithThreeBlogs = [
        {
            _id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
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

    test('of empty list of blogs is undefined.', () => {
        const result = listHelper.favoriteBlog([]);
        expect(result).toBe(undefined);
    });

    test('of list with one blog is that blog.', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog);
        expect(result).toBe(listWithOneBlog[0]);
    });

    test('of list with three blogs is one with most likes.', () => {
        const result = listHelper.favoriteBlog(listWithThreeBlogs);
        expect(result).toBe(listWithThreeBlogs[1]);
    });
});

describe('Most blogs', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
    ];

    const listWithThreeBlogs = [
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

    test('of empty list of blogs is undefined.', () => {
        const result = listHelper.mostBlogs([]);
        expect(result).toStrictEqual({ author: undefined, blogs: 0 });
    });

    test('of list with one blog is that blog.', () => {
        const result = listHelper.mostBlogs(listWithOneBlog);
        expect(result).toStrictEqual({ author: 'Edsger W. Dijkstra', blogs: 1 });
    });

    test('of list with three blogs is one with most likes.', () => {
        const result = listHelper.mostBlogs(listWithThreeBlogs);
        expect(result).toStrictEqual({ author: 'Edsger W. Dijkstra', blogs: 2 });
    });
});
