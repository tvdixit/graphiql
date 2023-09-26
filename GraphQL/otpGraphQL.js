const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLSchema,
} = require("graphql");
const { generateOTP, sendOTPViaTwilio } = require("../Service/otpSend");

const OTPType = new GraphQLObjectType({
  name: "OTP",
  fields: () => ({
    phone_no: { type: GraphQLString },
    otp: { type: GraphQLString },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    dummyQuery: {
      type: GraphQLString,
      resolve: () => "This is a dummy query.",
    },
  },
});

const OTPMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    sendOTP: {
      type: OTPType,
      args: {
        phone_no: { type: new GraphQLNonNull(GraphQLString) },
        // username: { type: GraphQLString },
      },
      resolve: async (_, { phone_no, username }) => {
        const otp = generateOTP();
        await sendOTPViaTwilio(phone_no, otp);
        return { phone_no, otp };
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: OTPMutation,
});

module.exports = schema;
