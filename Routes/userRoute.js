const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const {
  RootQuery,
  Mutation,
  OTPMutation,
} = require("../Controller/userController");
// const { generateOTP } = require("../Service/otpSend");

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

const otpSchema = new GraphQLSchema({
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      sendOTP: OTPMutation,
    },
  }),
});

// Create a GraphQL endpoint
app.use(
  "/send-otp",
  graphqlHTTP({
    schema: otpSchema,
    graphiql: true,
  })
);

module.exports = {
  route: app,
};
