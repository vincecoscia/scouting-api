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
  week: {
    type: Number,
    required: [true, "Please add a week"],
    maxlength: [2, "Week can not be longer than 2 characters"],
  },
  averageOverall: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true}
});

// Reverse populate with virtuals
SeasonSchema.virtual('players', {
  ref: 'Player',
  localField: '_id',
  foreignField: 'season',
  justOne: false
})


module.exports = mongoose.model("Season", SeasonSchema);
