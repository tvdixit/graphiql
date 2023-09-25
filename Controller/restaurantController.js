const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");

const {
  RestaurantType,
  RestaurantInputType,
} = require("../GraphQL/restaurantGraphQL");
const Restaurant = require("../Schema/restaurantSchema");

// Define the RootQuery for querying restaurants
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    restaurant: {
      type: RestaurantType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        return Restaurant.findById(args._id);
      },
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve() {
        return Restaurant.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createRestaurant: {
      type: RestaurantType,
      args: {
        input: { type: RestaurantInputType },
      },
      async resolve(parent, args) {
        const restaurant = new Restaurant(args.input);
        return restaurant.save();
      },
    },
    updateRestaurant: {
      type: RestaurantType,
      args: {
        _id: { type: GraphQLID },
        input: { type: RestaurantInputType },
      },
      resolve(parent, args) {
        return Restaurant.findByIdAndUpdate(args._id, args.input, {
          new: true,
        });
      },
    },
  },
});

module.exports = {
  RootQuery,
  Mutation,
};
