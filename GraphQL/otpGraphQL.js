const { GraphQLObjectType, GraphQLString } = require("graphql");

const OTPType = new GraphQLObjectType({
  name: "OTP",
  fields: () => ({
    phone_no: { type: GraphQLString },
    otp: { type: GraphQLString },
  }),
});
//RootMutation.
const OTPMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    sendOTP: {
      type: GraphQLString, // Return type
      args: {
        phone_no: { type: GraphQLString }, // Input argument for phone number
      },
      resolve: async (_, { phone_no }) => {
        // Generate and send OTP using Twilio or your chosen SMS service
        const otp = generateOTP(); // Implement a function to generate a random OTP

        // Use Twilio or your SMS service to send OTP
        await sendOTPViaSMS(phone_no, otp); // Implement sendOTPViaSMS function

        return "OTP sent successfully";
      },
    },
  },
});

module.exports = { OTPType, OTPMutation };
