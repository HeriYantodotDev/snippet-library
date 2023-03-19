const express = require('express');

const path = require('path');

const {makeExecutableSchema} = require('@graphql-tools/schema');

const {ApolloServer} = require('@apollo/server');

const {expressMiddleware} = require('@apollo/server/express4')

const {loadFilesSync} = require('@graphql-tools/load-files');

const typesArray = loadFilesSync('**/*', {
  extensions: ['graphql']
});

const resolversArray = loadFilesSync('**/*', {
  extensions: ['.resolvers.js']
});

async function startApolloServer() {
  const app = express();
  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray
  });

  const server = new ApolloServer({
    schema
  });

  await server.start();

  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));

  // server.applyMiddleware({
  //   app, path: '/graphql'
  // });

  app.listen(3000, () => {
    console.log('Running GraphQL Apollo Server ...')
  });
} 

startApolloServer();