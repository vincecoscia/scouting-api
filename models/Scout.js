const mongoose = require("mongoose");

const ScoutSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [10, "Name can not be longer than 10 characters"],
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  evaluation: {
    type: Number,
    required: true,
  },
  reputation: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  bias: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true
  },
  franchise: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Franchise",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Scout", ScoutSchema);
