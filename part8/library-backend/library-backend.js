const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const { count } = require('./models/book');
const Book = require('./models/book');

const MONGODB_URI = '';

// Connect to Database
console.log('Connecting to database...');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB.')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB: ', error.message)
  });

const typeDefs = gql`
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
  }
  type Mutation {
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  }
  type Query {
    bookCount(name: String): Int!
    authorCount: Int!
    allBooks(name: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`;

const resolvers = {
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
    allAuthors: () => Person.find({})
  },
  Mutation: {
    addBook: async (root, args) => {
      // Prepare Book
      const book = new Book({ 
        title: args.title,
        published: args.published,
        author: args.author,
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
      if (Book.count({ author: args.author }) === 0) {
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
});
