const { ApolloServer, gql } = require('apollo-server');

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
];

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
      if (args.name) {
        return books.filter((book) => book.author === args.name).length;
      }
      return books.length;
    },
    authorCount: () => authors.length,
    allBooks: (roots, args) => { 
      const alwaysTrue = () => true;

      const nameFilter = (args.name)
        ? (book) => book.author === args.name
        : alwaysTrue;
      const genreFilter = (args.genre)
        ? (book) => book.genres.includes(args.genre)
        : alwaysTrue;

      return books.filter(nameFilter).filter(genreFilter);
    },
    allAuthors: () => authors.map((author) => {
      return { 
        name: author.name, 
        born: author.born,
        bookCount: books.filter((book) => book.author === author.name).length
      }
    })
  },
  Mutation: {
    addBook: (root, args) => {
      // Update Books
      const book = { ...args };
      books = books.concat(book);
      
      // Add New Author
      if (!authors.some((author) => author.name === args.author)) {
        const author = { 
          name: args.author,
          bookCount: 1,
        };
        authors = authors.concat(author);
      }

      return book;
    },
    editAuthor: (root, args) => {
      // Find Author
      const matchingNames = (author) => author.name === args.name;
      const selectedAuthor = authors.find(matchingNames);

      // Update if Found
      if (selectedAuthor) {
        const updatedAuthor = { ...selectedAuthor, born: args.setBornTo };

        // Update Authors Array
        authors = authors.map((author) => matchingNames(author) ? updatedAuthor : author);
        console.log('Test', authors);

        return updatedAuthor;
      }
      return null;
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
