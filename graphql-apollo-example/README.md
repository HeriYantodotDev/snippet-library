# Table of Contents
- [Introduction](#introduction)
- [Installing](#installing)

[Notion Link](https://www.notion.so/GraphQL-Apollo-7f5ee1c997a94fb6a8c1a906fbb38a9c?pvs=4)
# Introduction

Here are several links about Apollo: 

- [Apollo Docs Home - Apollo GraphQL Docs](https://www.apollographql.com/docs/)
- https://github.com/apollographql/apollo-server
- [Subscriptions in Apollo Server - Apollo GraphQL Docs](https://www.apollographql.com/docs/apollo-server/data/subscriptions/)

Apollo is like Facebook GraphQL but with more features. 

Two main components of Apollo that we will often use is : 

- Apollo Server
- Apollo clients

# Installing

Try to use this package ; 
[@apollo/server - npm (npmjs.com)](https://www.npmjs.com/package/@apollo/server) 

the previous package is deprecated : [apollo-server-express - npm (npmjs.com)](https://www.npmjs.com/package/apollo-server-express) 

It allows us to combine Apollo with an existing express server to take advantange of the best of both worlds. 

- First let’s uninstall `express-graphql` and replace it with apollo
    
    `npm uninstall express-graphql` 
    
- Then install `npm i @apollo/server`
- Let’s let’s remove this middleware : `const {graphqlHTTP} = require('express-graphql');`
    - please read this also : [API Reference: expressMiddleware - Apollo GraphQL Docs](https://www.apollographql.com/docs/apollo-server/api/express-middleware)
- Now let’s change the configuration in the server to be like this :
    - 
    
    ```graphql
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
    ```
    
- If you run it … It’s not GraphiQL any more but it looks like this :
    
    ![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/39ffbff1-e596-40f7-b8c5-fe359d4e3e2c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230319T061916Z&X-Amz-Expires=86400&X-Amz-Signature=dfc51d159c5ff8948b24c168cc0d8af592c83b1b90e6612022731cbe0c333638&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)
    
    It’s Apollo SandBox. Awesome right? 
    
    But I think just standard GraphQL is enough for my next project