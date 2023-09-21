const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLEnumType,
} = require("graphql");
const { GraphQLDate } = require("graphql-iso-date");
const User = require("../Schema/userSchema");

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
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: {
      type: UserType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args._id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      },
    },
  },
});

// Define mutations for creating and updating users
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        input: { type: UserInputType },
      },
      resolve(parent, args) {
        const user = new User(args.input);
        return user.save();
      },
    },
    updateUser: {
      type: UserType,
      args: {
        _id: { type: GraphQLID },
        input: { type: UserInputType },
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(args._id, args.input, { new: true });
      },
    },
  },
});
module.exports = { RootQuery, Mutation };
