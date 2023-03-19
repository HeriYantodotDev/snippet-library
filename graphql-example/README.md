# Table of Contents
<!-- TOC start -->
- [Introduction](#introduction)
- [RESTful API vs GraphQL](#restful-api-vs-graphql)
- [Building a GraphQL Server](#building-a-graphql-server)
  * [GraphiQL](#graphiql)
  * [More complex Example](#more-complex-example)
  * [GraphQL Tools](#graphql-tools)
- [Modularize GraphQL Project](#modularize-graphql-project)
  * [Resolver](#resolver)
  * [Modularize Resolvers](#modularize-resolvers)
  * [Filtering with Queries and Resolvers](#filtering-with-queries-and-resolvers)
  * [Mutation in GraphQL](#mutation-in-graphql)
<!-- TOC end -->

[Notion Link](https://www.notion.so/GraphQL-491ed481a63f41cb9be7ae3c906d65e0?pvs=4)

# Introduction

What’s the difference between REST & RESTful APIs? 

- a RESTful API is a well-designed REST API that adheres to a set of guidelines to ensure that it is scalable, flexible, and easy to use. These guidelines include using HTTP verbs correctly, using resource URIs, using hypermedia links, and providing stateless communication.
- In summary, all RESTful APIs are REST APIs, but not all REST APIs are necessarily RESTful APIs.

> GraphQL provides a different way of querying our servers for data. Different that the RESTful APIs that we’ve been using so far.
> 

[GraphQL | A query language for your API](https://graphql.org/)

> GraphQL is a query language. GraphQL specifies how our front ends should talk to our backend APIs and how the backend APIs should be built to respond to GraphQL messages
> 

Why GraphQL is necessary? The RESTful APIs are perfectly well. 

- It simplifies thing. GraphQL gets rid all of end points for different type collection of data  in the backend and replace them with ONE SINGLE END POINT
- It’s usually a post request where the body of the query is the `/graphql`
    - So it’s usually like this : `POST/graphql`

So it has three things: 

1. Describe your data 
    
    ```jsx
    type Project {
      name: String
      tagline: String
      contributors: [User]
    }
    ```
    
2. Ask for what you want
    
    ```jsx
    {
      project(name: "GraphQL") {
        tagline
      }
    }
    ```
    
3. Get predictable results 
    
    ```jsx
    {
      "project": {
        "tagline": "A query language for APIs"
      }
    }
    ```
    

Test it: 

⇒ You can play around this. 
[SWAPI GraphQL API](https://graphql.org/swapi-graphql?query=query%20%7B%0A%20%20film(filmID%3A%201)%20%7B%0A%20%20%20%20title%0A%20%20%20%20producers%0A%20%20%7D%0A%7D) 

Example this is the query from the browser: 

```graphql
{
  film(filmID: 1) {
    title
    producers
  }
}
```

and here’s the response from the server

```json
{
  "data": {
    "film": {
      "title": "A New Hope",
      "producers": [
        "Gary Kurtz",
        "Rick McCallum"
      ]
    }
  }
}
```

# RESTful API vs GraphQL

> A perfect case for GraphQL is an ecommerce application. 
For example a page that renders product page. We will need to make this request :
* get ⇒ /products - /products/{id}  - products/{id}/reviews - 
* Post /orders/ - /orders/{id} 
All of this request will send to the server or to a few different servers which each handle part of the workload.
> 

Under Fetching: 

- **We need to make several back and forth to the server before the page is fully loaded with the information needed.**

Over Fetching:

- the request that we made, returned data that contains a lot of information that we don’t need.

GraphQL could solve the problem for Under Fetching and Over Fetching. Through single end point it could request the necessary data. 

> The flexibility of query language adds some complexity which might not be worth the effort for a simple application. For larger app is great.
> 

The advantage GraphQL against RESTful API:

- No under-fetching
- No over-fetching
- Schemas and types
- Speeds up development.
    - In a restful API we need to create the route, and change the end point.
    - In GraphQL we don’t have to worry about the end point. So one end point to all request.

Disadvantage : 

- Flexibility adds complexity. It still works with HTTP. Initial set up for GraphQL. For small application
- Difficult to cache. In RESFful server, for example we make a request like get /launches. We can only make one time request and use the data in it in the browser. In GraphQL we can’t predict the response, we need to look inside the query. In the official website, GraphQL suggests several way to do Caching.  [Caching | GraphQL](https://graphql.org/learn/caching/)
    - what is catching :
        - Caching in web development is a feature that stores a copy of your site’s data for future reuse. It helps web browsers obtain your website’s data faster, improving loading time. The cached data typically includes the site’s static content, such as images, HTML, CSS, and JavaScript files. With caching, web browsers can display websites without fetching resources directly from the web server. [This improves site ranking, bandwidth efficiency, user experience, and conversions](https://www.hostinger.com/tutorials/website-cache)
- Not RESTful
    - Many developers don’t familiar with GraphQL.

> It’s a common practice that RESTful API is working together in conjunction with GraphQL.
>


# Building a GraphQL Server

We can use GraphQL in any programming language. 

Several tools like : 

- [Relay](https://relay.dev/) ⇒ Front End
- [Apollo GraphQL | Supergraph: unify APIs, microservices, & databases in a composable graph](https://www.apollographql.com/)

- First we install the `express-graphql` middleware.
    - `npm install express-graphql`
- It’s a little bit error when use `express-graphql` . We can use other packages. But let’s use it as an example.
- Then install `graphql` .

Here’s the code example for GraphQL Server : 

```json
const express = require('express');

const {buildSchema, 

} = require('graphql')

const {graphqlHTTP} =  require('express-graphql');

const schema = buildSchema(`
  type Query {
    description: String
    price: Float
  }
`);

const root = {
  description: 'Red Shoe',
  price: 42.12
};

const app = express();

app.use('/graphql',graphqlHTTP({
  schema: schema,
  rootValue: root
}));

app.listen(3000, () => {
  console.log('Running GraphQL Server ...')
});
```

Then using PostMan we can create : 

- a post request
- in body contains JSON file :
    - 
    
    ```json
    {
        "query": "{ description }"
    }
    ```
    

Then it returns like this : 

```json
{
    "data": {
        "description": "Red Shoe"
    }
}
```

## GraphiQL

Is a frontend application. this tool is already included in the graphQL package. 

This is to test the API. 

It’s more convenient to to test using GraphiQL instead of testing the API manually using PostMan.

So we have to enable it first: 

```json
app.use('/graphql',graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
```

Then we run the server when we access the endpont, for example : `[http://localhost:3000/graphql``](http://localhost:3000/graphql`) 

Than this will appear : 

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/db0079a3-757b-4cfb-af94-ce3a2f227ad4/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230319T044417Z&X-Amz-Expires=86400&X-Amz-Signature=dff6af02b15aeb77374a966a7fb4446bde0cc130d44e265d7e00d92516143b06&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

So if we try:

We can also find the Schema that we define, and it becomes the documentation. 

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/242de9bd-e479-42fb-90b1-05b67c79957f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230319T044523Z&X-Amz-Expires=86400&X-Amz-Signature=e8e4b62f99b8aa871060044b6fd0201bc8aee5a05317e04c328fddf012f48478&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject)

## More complex Example

Here are the complex examples: 

Here is the example of nested schema : 

```json
const schema = buildSchema(`
  type Query {
    products: [Product]
    orders: [Order]
  }

  type Product {
    id: ID!
    description: String!
    reviews: [Review]
    price: Float!
  }

  type Review {
    rating: Int
    comment: String
  }

  type Order {
    date: String!
    subtotal: Float!
    items: [OrderItem]

  }

  type OrderItem {
    product: Product!
    quantity: Int!
  }

`);
```

## GraphQL Tools

This is a set of utilities to simplify the way that we make GraphQL servers.

It's used under the hood by the Apollo GraphQL framework, but it's available as a standalone package so that you can use some of the power of Apollo without bringing in the entire project.

Here’s the official site : [Home – GraphQL Tools (the-guild.dev)](https://the-guild.dev/graphql/tools)

This GraphQL tool is open source. While Apollo is not. 

- It includes tools to organize GraphQL project including breaking schema and merge it back.
- Split business logic and schema and logic.
- We do not need to reinvent the wheel.

# Modularize GraphQL Project

- First we need to install it : `npm install @graphql-tools/schema` . For somehow it’s error when we install it. We have to uninstall `graphql` first, then we install it graphql-tools/schema.
    - Documentation : [@graphql-tools/schema – GraphQL Tools (the-guild.dev)](https://the-guild.dev/graphql/tools/docs/api/modules/schema_src)
- Or we can try the older version : `"graphql": "^15.8.0"` . So we can still use anything.
- Don’t forget to install this extension : [GraphQL: Language Feature Support - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)
- then, let’s install this extension `npm install @graphql-tools/load-files`

this is the example : 

- We put the schema into separate file.
    - create a folder named `orders` and we create `orders.graphql` and `orders.model.js`
    - In `orders.graphql` , it contains the schema for order
        
        ```graphql
        type Query {
          orders: [Order]
        }
        
        type Order {
          date: String!
          subtotal: Float!
          items: [OrderItem]
        
        }
        
        type OrderItem {
          product: Product!
          quantity: Int!
        }
        ```
        
    - In `orders.model.js` , in contains the data for the orders, in this example, it’s the static data :
        
        ```jsx
        module.exports = [
          {
            date: '2005-05-05',
            subtotal: 90.22,
            items: [
              {
                product: {
                  id: 'redshoe',
                  description: 'Old Red Shoe',
                  price: 45.11
                },
                quantity: 2
              }
            ]
          }
        ];
        ```
        
- create a folder named `products` which has file `products.graphql` and `products.model.js`
    - In `products.graphql`, it contains schema for product.
        
        ```graphql
        type Query {
          products: [Product]
        }
        
        type Product {
          id: ID!
          description: String!
          reviews: [Review]
          price: Float!
        }
        
        type Review {
          rating: Int
          comment: String
        }
        ```
        
    - in `products.model.js` it contains the data. In this example. Just the static data .
        
        ```jsx
        module.exports = [
          {
            id: 'redshoe',
            description: 'Red Shoe',
            price: 40.19
          },
          {
            id: 'bluejean',
            description: 'Blue Jeans',
            price: 55.55
          }
        ];
        ```
        
- Great now in the `server.js` , we combine all of schema, and put the data.
    - pay attention on how we define schema. First we import the package from `@graphql-tools/schema` .  We use the `makeExecutableSchema` here.
        
        ```graphql
        const schema = makeExecutableSchema({
          typeDefs: [typesArray]
        });
        ```
        
    - Then for the typeArray it self we combine all of the scema using the function from `@graphql-tools/load-files` .  `const {loadFilesSync} = require('@graphql-tools/load-files');`
        
        ```graphql
        const typesArray = loadFilesSync('**/*', {
          extensions: ['graphql']
        });
        ```
        
    - We still use the same middleware `graphqlHTTP` :
        
        ```graphql
        app.use('/graphql',graphqlHTTP({
          schema: schema,
          rootValue: root,
          graphiql: true
        }));
        ```
        
    - Finally we determine the value in the `root` variable. In this case we just import it in this file.
        
        ```graphql
        const root = {
          products: require('./products/products.model'),
          orders: require('./orders/orders.model')
        };
        ```
        
        Here are the full code. 
        
    
    ```jsx
    const express = require('express');
    
    const path = require('path');
    
    const {makeExecutableSchema} = require('@graphql-tools/schema');
    
    const {graphqlHTTP} =  require('express-graphql');
    
    const {loadFilesSync} = require('@graphql-tools/load-files');
    
    // const typesArray = loadFilesSync(path.join( __dirname, '**/*.graphql'));
    
    const typesArray = loadFilesSync('**/*', {
      extensions: ['graphql']
    });
    
    const schema = makeExecutableSchema({
      typeDefs: [typesArray]
    });
    
    const root = {
      products: require('./products/products.model'),
      orders: require('./orders/orders.model')
    };
    
    const app = express();
    
    app.use('/graphql',graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true
    }));
    
    app.listen(3000, () => {
      console.log('Running GraphQL Server ...')
    });
    ```
    

## Resolver

- Documentation : [Execution | GraphQL](https://graphql.org/learn/execution/)
- Every graphQL project has two main components :
    - `schemas` and `resolvers`
- So what is resolvers:
    - When we make a query, GraphQL always firsts determines the the query is valid or not by looking at our schemas.
    - then executes it.
    - When executing a query, the value of each field is determined by calling a function called a `resolver`
    - Then it wraps all those values up and sends them back to the client.
- So far in the code above we’ve been using `root values` to determine what data comes back from API. However it’s a hardcoded data. And it’s not realistic.
    - In real life we will do database query or some other logic to get the data for one of our fields.
    - Instead of using hardcoded root values we use functions. That we call `resolver`
- Example :
    - First we have to define the `resolvers` field in the `schema` variable :
    - then we can declare the function. The function for each resolvers has 4 arguments : `parents` , `args` , `context`, and `info`
    - In our example we are using the data from our hardcoded data in the root.  But now we know that we now can do complex operation like doing a query to the database to get the data.
        - 
        
        ```graphql
        const root = {
          products: require('./products/products.model'),
          orders: require('./orders/orders.model')
        };
        ```
        

Full Code : 

```graphql
const schema = makeExecutableSchema({
  typeDefs: [schemaText],
  resolvers: {
    Query: {
      products: async (parent, args, context, info) => {
        console.log('Getting the products ...')
        const product = await Promise.resolve(parent.products);
        return product;
      },
      orders: (parent, args, context, info) => {
        console.log('Getting the orders ... ');
        return parent.orders;
      }
    }
  }
});
```

## Modularize Resolvers

How? 
We can use the same thing like when we modularize our schema, so it’s like this : 

```graphql
const resolversArray = loadFilesSync('**/*', {
  extensions: ['.resolvers.js']
});
```

and in the schema 

```graphql
const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray
});
```

Here’s the full code 

- server.js
    
    ```graphql
    const express = require('express');
    
    const path = require('path');
    
    const {makeExecutableSchema} = require('@graphql-tools/schema');
    
    const {graphqlHTTP} =  require('express-graphql');
    
    const {loadFilesSync} = require('@graphql-tools/load-files');
    
    const typesArray = loadFilesSync('**/*', {
      extensions: ['graphql']
    });
    
    const resolversArray = loadFilesSync('**/*', {
      extensions: ['.resolvers.js']
    });
    
    const schema = makeExecutableSchema({
      typeDefs: typesArray,
      resolvers: resolversArray
    });
    
    const app = express();
    
    app.use('/graphql',graphqlHTTP({
      schema: schema,
      graphiql: true
    }));
    
    app.listen(3000, () => {
      console.log('Running GraphQL Server ...')
    });
    ```
    
- products.resolvers.js
    
    ```graphql
    const productsModels = require('./products.model');
    
    module.exports = {
      Query: {
        products: () => {
          return productsModels.getAllProducts();
        }
      }
    };
    ```
    
- products.model.js
    
    ```graphql
    const products = [
      {
        id: 'redshoe',
        description: 'Red Shoe',
        price: 40.19
      },
      {
        id: 'bluejean',
        description: 'Blue Jeans',
        price: 55.55
      }
    ];
    
    function getAllProducts() {
      return products;
    }
    
    module.exports = {
      getAllProducts
    };
    ```
    
- orders.resolvers.js
    
    ```graphql
    const ordersModel = require('./orders.model');
    
    module.exports = {
      Query: {
        orders: () => {
          return ordersModel.getAllOrders();
        }
      }
    }
    ```
    
- orders.model.js
    
    ```graphql
    const orders = [
      {
        date: '2005-05-05',
        subtotal: 90.22,
        items: [
          {
            product: {
              id: 'redshoe',
              description: 'Old Red Shoe',
              price: 45.11
            },
            quantity: 2
          }
        ]
      }
    ];
    
    function getAllOrders() {
      return orders;
    };
    
    module.exports = {
      getAllOrders
    }
    ```
    

## Filtering with Queries and Resolvers

This is important since it’s impossible that we’re going to send all of the data for all the time. We might want only to return just several data that match the filter. 

- First in the schema or file with `.graphql` we define the query :
    - Notice the code below, we add two queries : `productsByPrice` and also `product` each of them as you can see will have the `Product` data type. One in an array, and one just a single object.
    
    ```graphql
    type Query {
      products: [Product]
      productsByPrice(min: Float!, max: Float!): [Product]
      product(id: ID!): Product
    }
    
    type Product {
      id: ID!
      description: String!
      reviews: [Review]
      price: Float!
    }
    
    type Review {
      rating: Int
      comment: String
    }
    ```
    
- Then in the resolvers we create an anonymous function as a call back function :
    
    ```graphql
    const productsModels = require('./products.model');
    
    module.exports = {
      Query: {
        products: () => {
          return productsModels.getAllProducts();
        },
        productsByPrice: (_, args) => {
          return productsModels.getProductsByPrice(args.min, args.max);
        }, 
    
        product: (_, args) => {
          return productsModels.getproductByID(args.id);
        }
        //the convension for argument that you don't use is to use underscore
        //if there are two arguments that you don't use then you use two underscores for the second unused arguments. 
      }
    };
    ```
    
- Then finally in the `products.model.js` we create a function to retrieve the data
    
    ```graphql
    const products = [
      {
        id: 'redshoe',
        description: 'Red Shoe',
        price: 40.19
      },
      {
        id: 'bluejean',
        description: 'Blue Jeans',
        price: 55.55
      }
    ];
    
    function getAllProducts() {
      return products;
    }
    
    function getProductsByPrice(min, max) {
      return products.filter((product) => {
        return product.price >= min && product.price <= max;
      })
    }
    
    function getproductByID(id) {
    
      return products.find(product => product.id === id);
    
    }
    
    module.exports = {
      getAllProducts,
      getProductsByPrice,
      getproductByID
    };
    ```
    

## Mutation in GraphQL

We can also do like update or delete data. So far we only learn about query. 

It also supports for CRUD operation. We use something called `mutation`. 

In the schema, or `products.graphql` we add a mutation schema : 

```graphql
type Mutation {
  addNewProduct(id: ID!, description: String!, price: Float!): Product
  addNewProductReview(id: ID!, rating: Int!, comment: String): Review
}
```

In the resolver we add a new resolver `products.resolver.js` 

```graphql
const productsModels = require('./products.model');

module.exports = {
  Query: {
    products: () => {
      return productsModels.getAllProducts();
    },
    productsByPrice: (_, args) => {
      return productsModels.getProductsByPrice(args.min, args.max);
    }, 

    product: (_, args) => {
      return productsModels.getproductByID(args.id);
    }
    //the convension for argument that you don't use is to use underscore
    //if there are two arguments that you don't use then you use two underscores for the second unused arguments. 
  },
  Mutation: {
    addNewProduct: (_, args) => {
      return productsModels.addNewProduct(args.id, args.description, args.price);
    },

    addNewProductReview: (_,args) => {
      return productsModels.addNewProductReview(args.id, args.rating, args.comment);
    }
  }
};
```

Then in the `products.model.js` , we add a function for each 

> Remember the return from the function should match the type in the schema ;
> 

```graphql
function addNewProduct(id, description, price) {
  const newProduct = {
    id,
    description,
    price,
    reviews: []
  }
  products.push(newProduct);
  return newProduct;
}

function addNewProductReview(id, rating, comment) {

  const matchProduct = getproductByID(id);

  if (matchProduct) {
    const newReview = {
      rating,
      comment
    };

    matchProduct.reviews.push(newReview);

    return newReview;
  }

}
```