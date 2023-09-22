const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
const { UserType, UserInputType } = require("../GraphQL/userGraphQL");
const User = require("../Schema/userSchema");

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

// Define mutations for creating and updating users.
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        input: { type: UserInputType },
      },
      async resolve(parent, args) {
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
module.exports = {
  RootQuery,
  Mutation,
};
