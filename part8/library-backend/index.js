// Server
const { ApolloServer, UserInputError, gql } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');

// GraphQL
const { execute, subscribe } = require('graphql');
const { Subscription, SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// Database and Environment
const mongoose = require('mongoose');
const config = require('./utils/config');

// GraphQL Schema
const typeDefs = require('./typeDefs/typeDefs');
const resolvers = require('./resolvers/resolvers');
const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = http.createServer(app);

// Establish Database Connection
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
  schema,
  plugins: [{
    async serverWillStart() {
      return {
        async drainServer() {
          subscriptionServer.close();
        }
      };
    }
  }]
});

const subscriptionServer = SubscriptionServer.create({
  schema,
  execute,
  subscribe
}, {
  server: httpServer,
  path: server.graphqlPath
})

server.start()
  .then(() =>{
    server.applyMiddleware({
      app,
      path: '/'
    });

    httpServer.listen(config.PORT, () => {
      console.log(
        `🚀 Query endpoint ready at http://localhost:${config.PORT}${server.graphqlPath}`
      );
      console.log(
        `🚀 Subscription endpoint ready at ws://localhost:${config.PORT}${server.graphqlPath}/graphql`
      );
    })
  });
