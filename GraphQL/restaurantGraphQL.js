const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require("graphql");

const RestaurantType = new GraphQLObjectType({
  name: "Restaurant",
  fields: () => ({
    _id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    postal_code: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    is_veg: { type: GraphQLInt },
    cuisine: { type: new GraphQLList(GraphQLString) },
    opening_hours: {
      type: new GraphQLObjectType({
        name: "OpeningHours",
        fields: {
          monday: { type: GraphQLString },
          tuesday: { type: GraphQLString },
          wednesday: { type: GraphQLString },
          thursday: { type: GraphQLString },
          friday: { type: GraphQLString },
          saturday: { type: GraphQLString },
          sunday: { type: GraphQLString },
        },
      }),
    },
    menu: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "MenuItem",
          fields: {
            category: { type: GraphQLString },
            dishes: {
              type: new GraphQLList(
                new GraphQLObjectType({
                  name: "Dish",
                  fields: {
                    name: { type: GraphQLString },
                    description: { type: GraphQLString },
                    price: { type: GraphQLInt },
                  },
                })
              ),
            },
          },
        })
      ),
    },
    reviews: { type: GraphQLInt },
    averagerating: { type: GraphQLInt },
    discount: { type: GraphQLString },
    about: { type: GraphQLString },
    trending: { type: GraphQLBoolean },
    happy_hours: { type: GraphQLBoolean },
    new_open: { type: GraphQLBoolean },
    outdoor_dining: { type: GraphQLBoolean },
    seating: { type: GraphQLString },
    guest_capacity: { type: GraphQLInt },
    location_address: { type: GraphQLString },
  }),
});

const RestaurantInputType = new GraphQLInputObjectType({
  name: "RestaurantInput",
  fields: () => ({
    user_id: { type: GraphQLString },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: new GraphQLNonNull(GraphQLString) },
    street: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    state: { type: new GraphQLNonNull(GraphQLString) },
    postal_code: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    is_veg: { type: new GraphQLNonNull(GraphQLInt) },
    cuisine: { type: new GraphQLNonNull(GraphQLString) },
    opening_hours: {
      type: new GraphQLInputObjectType({
        name: "OpeningHoursInput",
        fields: {
          monday: { type: new GraphQLNonNull(GraphQLString) },
          tuesday: { type: new GraphQLNonNull(GraphQLString) },
          wednesday: { type: new GraphQLNonNull(GraphQLString) },
          thursday: { type: new GraphQLNonNull(GraphQLString) },
          friday: { type: new GraphQLNonNull(GraphQLString) },
          saturday: { type: new GraphQLNonNull(GraphQLString) },
          sunday: { type: new GraphQLNonNull(GraphQLString) },
        },
      }),
    },
    menu: {
      type: new GraphQLInputObjectType({
        name: "MenuItemInput",
        fields: {
          category: { type: new GraphQLNonNull(GraphQLString) },
          dishes: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: "DishInput",
                fields: {
                  name: { type: new GraphQLNonNull(GraphQLString) },
                  description: { type: new GraphQLNonNull(GraphQLString) },
                  price: { type: new GraphQLNonNull(GraphQLInt) },
                },
              })
            ),
          },
        },
      }),
    },
    reviews: { type: GraphQLInt },
    averagerating: { type: GraphQLInt },
    discount: { type: GraphQLString },
    about: { type: new GraphQLNonNull(GraphQLString) },
    trending: { type: GraphQLBoolean },
    happy_hours: { type: GraphQLBoolean },
    new_open: { type: GraphQLBoolean },
    outdoor_dining: { type: GraphQLBoolean },
    seating: { type: new GraphQLNonNull(GraphQLString) },
    guest_capacity: { type: new GraphQLNonNull(GraphQLInt) },
    location_address: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = { RestaurantType, RestaurantInputType };

// const {
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLBoolean,
//   GraphQLInt,
//   GraphQLList,
//   GraphQLNonNull,
//   GraphQLInputObjectType,
//   GraphQLID,
// } = require("graphql");

// // Define the MenuItemType for the menu items
// const MenuItemType = new GraphQLObjectType({
//   name: "MenuItem",
//   fields: () => ({
//     name: { type: GraphQLString },
//     description: { type: GraphQLString },
//     price: { type: GraphQLInt },
//   }),
// });

// // Define the OpeningHoursType for the opening hours
// const OpeningHoursType = new GraphQLObjectType({
//   name: "OpeningHours",
//   fields: {
//     monday: { type: GraphQLString },
//     tuesday: { type: GraphQLString },
//     wednesday: { type: GraphQLString },
//     thursday: { type: GraphQLString },
//     friday: { type: GraphQLString },
//     saturday: { type: GraphQLString },
//     sunday: { type: GraphQLString },
//   },
// });

// // Define the RestaurantType for the restaurant
// const RestaurantType = new GraphQLObjectType({
//   name: "Restaurant",
//   fields: () => ({
//     _id: { type: GraphQLID },
//     user_id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     description: { type: GraphQLString },
//     image: { type: GraphQLString },
//     street: { type: GraphQLString },
//     city: { type: GraphQLString },
//     state: { type: GraphQLString },
//     postal_code: { type: GraphQLString },
//     phone: { type: GraphQLString },
//     email: { type: GraphQLString },
//     is_veg: { type: GraphQLInt },
//     cuisine: { type: new GraphQLList(GraphQLString) },
//     opening_hours: { type: OpeningHoursType },
//     menu: {
//       type: new GraphQLList(MenuItemType),
//     },
//     reviews: { type: GraphQLInt },
//     averagerating: { type: GraphQLInt },
//     discount: { type: GraphQLString },
//     about: { type: GraphQLString },
//     trending: { type: GraphQLBoolean },
//     happy_hours: { type: GraphQLBoolean },
//     new_open: { type: GraphQLBoolean },
//     outdoor_dining: { type: GraphQLBoolean },
//     seating: { type: GraphQLString },
//     guest_capacity: { type: GraphQLInt },
//     location_address: { type: GraphQLString },
//   }),
// });

// // Define a GraphQL input type for creating or updating a restaurant
// const RestaurantInputType = new GraphQLInputObjectType({
//   name: "RestaurantInput",
//   fields: () => ({
//     user_id: { type: GraphQLID },
//     name: { type: new GraphQLNonNull(GraphQLString) },
//     description: { type: new GraphQLNonNull(GraphQLString) },
//     image: { type: new GraphQLNonNull(GraphQLString) },
//     street: { type: new GraphQLNonNull(GraphQLString) },
//     city: { type: new GraphQLNonNull(GraphQLString) },
//     state: { type: new GraphQLNonNull(GraphQLString) },
//     postal_code: { type: new GraphQLNonNull(GraphQLString) },
//     phone: { type: new GraphQLNonNull(GraphQLString) },
//     email: { type: new GraphQLNonNull(GraphQLString) },
//     is_veg: { type: new GraphQLNonNull(GraphQLInt) },
//     cuisine: { type: new GraphQLList(GraphQLString) },
//     opening_hours: { type: GraphQLString },
//     menu: {
//       type: new GraphQLInputObjectType({
//         name: "MenuItemInput",
//         fields: {
//           category: { type: new GraphQLNonNull(GraphQLString) },
//           dishes: {
//             type: new GraphQLList(
//               new GraphQLInputObjectType({
//                 name: "DishInput",
//                 fields: {
//                   name: { type: new GraphQLNonNull(GraphQLString) },
//                   description: { type: new GraphQLNonNull(GraphQLString) },
//                   price: { type: new GraphQLNonNull(GraphQLInt) },
//                 },
//               })
//             ),
//           },
//         },
//       }),
//     },
//     reviews: { type: GraphQLInt },
//     averagerating: { type: GraphQLInt },
//     discount: { type: GraphQLString },
//     about: { type: new GraphQLNonNull(GraphQLString) },
//     trending: { type: GraphQLBoolean },
//     happy_hours: { type: GraphQLBoolean },
//     new_open: { type: GraphQLBoolean },
//     outdoor_dining: { type: GraphQLBoolean },
//     seating: { type: GraphQLBoolean },
//     guest_capacity: { type: new GraphQLNonNull(GraphQLInt) },
//     location_address: { type: new GraphQLNonNull(GraphQLString) },
//   }),
// });

// module.exports = {
//   RestaurantType,
//   RestaurantInputType,
// };
