const mongoose = require('mongoose');

const BucketSchema = new mongoose.Schema({
  position: {
    type: String,
    required: [true, 'Please add a position'],
    unique: true,
    enum: [
      'QB',
      'RB',
      'WR',
      'TE',
      'OL',
      'DL',
      'LB',
      'CB',
      'S',
      'K',
    ]
  },
  relevantStats: {
    type: [String],
    required: [true, 'Please add relevant stats'],
  }
})

module.exports = mongoose.model('Bucket', BucketSchema);
