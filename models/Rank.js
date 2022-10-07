const mongoose = require("mongoose");

const RankSchema = new mongoose.Schema({
  sparq: {
    type: Number,
  },
  ranking: {
    type: Number,
    required: true,
  },
  overall: {
    type: Number,
    required: true,
  },
  player:{
      type: mongoose.Schema.ObjectId,
      ref: "Player",
  },
  season: {
    type: mongoose.Schema.ObjectId,
    ref: "Season",
  },
  scout: {
    type: mongoose.Schema.ObjectId,
    ref: "Scout",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rank", RankSchema);
