const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const Schema = require("../GraphQL/otpGraphQL");
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

// Create a GraphQL endpoint
app.use(
  "/send-otp",
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
  })
);

module.exports = {
  route: app,
};
