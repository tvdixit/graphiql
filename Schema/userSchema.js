const mongoose = require("mongoose");

//CreateUser Model Schema.
const userSchema = new mongoose.Schema(
  {
    profile_photo: { type: String, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    birth_date: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    address: { type: String, required: true },
    phone_no: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
