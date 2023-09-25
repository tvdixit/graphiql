const mongoose = require("mongoose");

//Create Restaurant Model Schema.
const restaurantSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true, unique: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postal_code: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    is_veg: { type: Number, default: 0, enum: [0, 1, 2], required: true },
    cuisine: {
      type: [String],
      enum: ["indian", "chinese", "punjabi", "italian", "southIndian"],
      required: true,
    },
    opening_hours: {
      monday: { type: String, required: true },
      tuesday: { type: String, required: true },
      wednesday: { type: String, required: true },
      thursday: { type: String, required: true },
      friday: { type: String, required: true },
      saturday: { type: String, required: true },
      sunday: { type: String, required: true },
    },
    menu: [
      {
        category: { type: String, enum: ["veg", "non_veg"], default: "veg" },
        dishes: [
          {
            name: { type: String, required: true },
            description: { type: String, required: true },
            price: { type: Number, required: true, min: 0 },
          },
        ],
      },
    ],
    reviews: { type: Number },
    averagerating: { type: Number, default: 0 },
    discount: { type: String, default: 0 },
    about: { type: String, required: true },
    trending: { type: Boolean, default: false, required: true },
    happy_hours: { type: Boolean, default: false, required: true },
    new_open: { type: Boolean, default: false, required: true },
    outdoor_dining: { type: Boolean, default: false, required: true },
    seating: {
      type: String,
      enum: ["luxury", "highTop", "counter", "bar", "outdoor"],
      required: true,
    },
    guest_capacity: { type: Number, default: 1, required: true },
    location_address: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
