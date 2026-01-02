const mongoose = require("mongoose");

const skillRequestSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SkillListing",
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  respondedAt: {
    type: Date
  }
});

// Index for faster queries
skillRequestSchema.index({ fromUser: 1, listingId: 1 });
skillRequestSchema.index({ toUser: 1, status: 1 });

module.exports = mongoose.model("SkillRequest", skillRequestSchema);
