const { ApolloServer, UserInputError, gql } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

const typeDefs = require('./typeDefs/typeDefs');
const resolvers = require('./resolvers/resolvers');

const config = require('./utils/config');

const app = express();
const httpServer = http.createServer(app);

// Database Connection
console.log('Connecting to database...');
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB.')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB: ', error.message)
  });

// Server Definition
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server.start()
  .then(() =>{
    server.applyMiddleware({
      app,
      path: '/'
    });

    httpServer.listen(config.PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${config.PORT}${server.graphqlPath}`);
    })
  });
