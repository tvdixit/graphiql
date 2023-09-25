const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLEnumType,
} = require("graphql");

// Define the InquiryType
const InquiryType = new GraphQLObjectType({
  name: "Inquiry",
  fields: () => ({
    _id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    restaurant_id: { type: GraphQLID },
    myself: { type: GraphQLBoolean },
    name: { type: GraphQLString },
    phone_no: { type: GraphQLString },
    email: { type: GraphQLString },
    total_person: { type: GraphQLString },
    inquiry_date: { type: GraphQLString },
    inquiry_time: { type: GraphQLString },
    special_request: { type: GraphQLString },
    status: {
      type: InquiryStatusEnum,
    },
  }),
});

// Define an enum for inquiry status
const InquiryStatusEnum = new GraphQLEnumType({
  name: "InquiryStatus",
  values: {
    PENDING: { value: "pending" },
    APPROVED: { value: "approved" },
    COMPLETED: { value: "completed" },
    CANCELLED: { value: "cancelled" },
    REJECTED: { value: "rejected" },
  },
});

// Define an InputType for creating or updating inquiries
const InquiryInputType = new GraphQLInputObjectType({
  name: "InquiryInput",
  fields: () => ({
    user_id: { type: GraphQLID },
    restaurant_id: { type: GraphQLID },
    myself: { type: GraphQLBoolean },
    name: { type: GraphQLString },
    phone_no: { type: GraphQLString },
    email: { type: GraphQLString },
    total_person: { type: GraphQLString },
    inquiry_date: { type: GraphQLString },
    inquiry_time: { type: GraphQLString },
    special_request: { type: GraphQLString },
    status: { type: InquiryStatusEnum },
  }),
});

module.exports = { InquiryType, InquiryInputType };
