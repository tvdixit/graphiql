const { GraphQLObjectType, GraphQLList, GraphQLID } = require("graphql");
const {
  InquiryType,
  InquiryInputType,
} = require("../GraphQL/inquiryFormGraphQL");
const Inquiry = require("../Schema/inquiryFormSchema");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    inquiry: {
      type: InquiryType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        return Inquiry.findById(args._id);
      },
    },
    inquiries: {
      type: new GraphQLList(InquiryType),
      resolve() {
        return Inquiry.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createInquiry: {
      type: InquiryType,
      args: {
        input: { type: InquiryInputType },
      },
      resolve(parent, args) {
        const inquiry = new Inquiry(args.input);
        return inquiry.save();
      },
    },
    updateInquiry: {
      type: InquiryType,
      args: {
        _id: { type: GraphQLID },
        input: { type: InquiryInputType },
      },
      resolve(parent, args) {
        return Inquiry.findByIdAndUpdate(args._id, args.input, { new: true });
      },
    },
  },
});

module.exports = { RootQuery, Mutation };
