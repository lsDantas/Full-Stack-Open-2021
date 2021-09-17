const { gql } = require('apollo-server-express'); 

const typeDefs = gql`
  type Subscription {
    bookAdded: Book!
  }
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
  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
  }
  type Mutation {
    login(
      username: String!
      password: String!
    ): Token
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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount(name: String): Int!
    authorCount: Int!
    allBooks(name: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me(username: String!): User
    getRecommendations(username: String!) : [Book!]!
  }
`;

module.exports = typeDefs;
