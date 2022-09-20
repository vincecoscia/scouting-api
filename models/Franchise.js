const mongoose = require('mongoose');
const slugify = require('slugify');

const FranchiseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [25, 'Name can not be longer than 25 characters']
  },
  slug: String,
  description: {
    type: String,
    maxlength: [500, 'Description can not be longer than 500 characters']
  },
  team: {
    type: [String],
    required: [true, 'Please select a team'],
    enum: [
      "Arizona Cardinals",
      "Atlanta Falcons",
      "Baltimore Ravens",
      "Buffalo Bills",
      "Carolina Panthers",
      "Chicago Bears",
      "Cincinnati Bengals",
      "Cleveland Browns",
      "Dallas Cowboys",
      "Denver Broncos",
      "Detroit Lions",
      "Green Bay Packers",
      "Houston Texans",
      "Indianapolis Colts",
      "Jacksonville Jaguars",
      "Kansas City Chiefs",
      "Las Vegas Raiders",
      "Los Angeles Chargers",
      "Los Angeles Rams",
      "Miami Dolphins",
      "Minnesota Vikings",
      "New England Patriots",
      "New Orleans Saints",
      "New York Giants",
      "New York Jets",
      "Philadelphia Eagles",
      "Pittsburgh Steelers",
      "San Francisco 49ers",
      "Seattle Seahawks",
      "Tampa Bay Buccaneers",
      "Tennessee Titans",
      "Washington Commanders"
    ]
  },
  scouts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Scout",
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true}
});

// Reverse populate with virtuals
FranchiseSchema.virtual('seasons', {
  ref: 'Season',
  localField: '_id',
  foreignField: 'franchise',
  justOne: false
})

// Create franchise slug from name
FranchiseSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Franchise', FranchiseSchema)