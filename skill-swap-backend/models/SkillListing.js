const mongoose = require("mongoose");

const skillListingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  skills: [{
    type: String,
    required: true,
    trim: true
  }],
  location: {
    type: String,
    trim: true
  },
  availability: {
    type: String,
    enum: ['full-time', 'part-time', 'weekends', 'evenings', 'flexible'],
    default: 'flexible'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SkillListing", skillListingSchema);
