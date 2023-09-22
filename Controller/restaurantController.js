const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const {
  restaurantType,
  RestaurantInputType,
} = require("../GraphQL/restaurantGraphQL");
const Restaurant = require("../Schema/restaurantSchema");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    restaurant: {
      type: restaurantType,
      args: { _id: { type: GraphQLID } },
      resolve: async (_, args) => {
        return await Restaurant.findById(args._id);
      },
    },
    restaurants: {
      type: new GraphQLList(restaurantType),
      resolve: async () => {
        return await Restaurant.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createRestaurant: {
      type: restaurantType,
      args: {
        input: { type: new GraphQLNonNull(RestaurantInputType) },
      },
      resolve: async (_, { input }) => {
        const restaurant = new Restaurant(input);
        const savedRestaurant = await restaurant.save();
        return savedRestaurant;
      },
    },
    updateRestaurant: {
      type: restaurantType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        input: { type: new GraphQLNonNull(RestaurantInputType) },
      },
      resolve: async (_, { _id, input }) => {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
          _id,
          input,
          { new: true }
        );
        return updatedRestaurant;
      },
    },
  },
});

module.exports = {
  RootQuery,
  Mutation,
};
