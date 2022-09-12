const mongoose = require("mongoose");
const slugify = require("slugify");

const SeasonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [10, "Name can not be longer than 10 characters"],
  },
  slug: String,
  class: {
    type: Array,
    default: []
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  franchise: {
    type: mongoose.Schema.ObjectId,
    ref: 'Franchise',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Season", SeasonSchema);
