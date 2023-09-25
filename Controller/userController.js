const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
} = require("graphql");
const { UserType, UserInputType } = require("../GraphQL/userGraphQL");
const User = require("../Schema/userSchema");
const { generateOTP, sendOTPViaSMS } = require("../Service/otpSend");

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

const OTPInputType = new GraphQLInputObjectType({
  name: "OTPInput",
  fields: () => ({
    phone_no: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

// Define a GraphQL type for the OTP response
const OTPResponseType = new GraphQLObjectType({
  name: "OTPResponse",
  fields: () => ({
    phone_no: { type: GraphQLString },
    otp: { type: GraphQLString },
  }),
});

// Define the OTP mutation
const OTPMutation = {
  type: OTPResponseType,
  args: {
    input: { type: OTPInputType },
  },
  async resolve(_, { input }) {
    try {
      const otp = generateOTP(); // Generate OTP
      await sendOTPViaSMS(input.phone_no, otp); // Send OTP via SMS

      return { phone_no: input.phone_no, otp };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
module.exports = {
  RootQuery,
  Mutation,
  OTPMutation,
};
