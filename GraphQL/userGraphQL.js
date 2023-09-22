const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require("graphql");
const { GraphQLDate } = require("graphql-iso-date");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    profile_photo: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    birth_date: { type: GraphQLDate },
    gender: { type: GraphQLString },
    address: { type: GraphQLString },
    phone_no: { type: GraphQLString },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

const UserInputType = new GraphQLInputObjectType({
  name: "UserInput",
  fields: () => ({
    profile_photo: { type: GraphQLString },
    first_name: { type: new GraphQLNonNull(GraphQLString) },
    last_name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    birth_date: { type: GraphQLDate },
    gender: { type: GraphQLString },
    address: { type: new GraphQLNonNull(GraphQLString) },
    phone_no: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = { UserType, UserInputType };
