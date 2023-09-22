const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const { RootQuery, Mutation } = require("../Controller/userController");

app.use(
  "/register",
  graphqlHTTP({
    schema: new GraphQLSchema({
      query: RootQuery,
      mutation: Mutation,
    }),
    graphiql: true,
  })
);

module.exports = {
  route: app,
};
