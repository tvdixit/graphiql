const mongoose = require("mongoose");

//Otp Model Schema :
const otpSchema = new mongoose.Schema({
  phone_no: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    expires: 300, // Expiry time set to 5 minutes in seconds
    default: Date.now,
  },
});

module.exports = mongoose.model("Otp", otpSchema);
