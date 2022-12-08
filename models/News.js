const mongoode = require('mongoose');
const Schema = mongoode.Schema;

const NewsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  // player: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Player',
  //   required: true
  // },
  // season: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Season',
  //   required: true
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoode.model('News', NewsSchema);