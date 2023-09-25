const mongoose = require("mongoose");

// InquiryForm Model Schema.
const inquirySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    myself: { type: Boolean, enum: [true, false] },
    name: { type: String },
    phone_no: { type: String },
    email: { type: String },
    total_person: { type: Number },
    inquiry_date: { type: String },
    inquiry_time: { type: String },
    special_request: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "completed", "cancelled", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
