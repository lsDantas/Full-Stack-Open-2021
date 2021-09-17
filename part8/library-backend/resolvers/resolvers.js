const { ApolloServer, UserInputError, gql } = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');
const jwt = require('jsonwebtoken');

// Models
const Author = require('../models/author');
const Book = require('../models/book');
const User = require('../models/user');

const pubsub = new PubSub();

const resolvers = {
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
  Query: {
    bookCount: (root, args) => {
      const { name } = args;

      const authorQuery = { author: name };
      const filters = {
        ...(name && authorQuery)
      };

      return Book.count(filters);
    },
    authorCount: () => Author.count({}),
    allBooks: (root, args) => {
      const { name, genre } = args;

      const authorQuery = { author: name };
      const genreQuery = { genre: { $all: genre } };

      const filters = {
        ...(name && authorQuery),
        ...(genre && genreQuery)
      };

      return Book.find(filters);
    },
    allAuthors: () => Author.find({}),
    me: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      return user;
    },
    getRecommendations: async (root, args) => {
      if (args.username) {
        const user = await User.findOne({ username: args.username });
        const favoriteGenre = user.favoriteGenre;
        const books = Book.find({ genres: { $all: favoriteGenre } });

        return books
      }

      return null;
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      // Prepare Book
      const book = new Book({
        title: args.title,
        author: args.author,
        published: args.published,
        genres: args.genres,
      });

      // Save Book
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      // Add Author if New
      const booksWithAuthor = await Book.count({ author: args.author });

      if (booksWithAuthor === 1) {
        const author = new Author({
          name: args.author
        });

        // Save Author
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      // Notify Subscribers
      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args) => {
      // Find Author
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;

      // Update Author
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      // Save User
      try {
        user.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== `secret`) {
        throw new UserInputError('Wrong credentails');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.SECRET) }
    }
  },
};

module.exports = resolvers;
