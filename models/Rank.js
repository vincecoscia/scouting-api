const mongoose = require("mongoose");

const RankSchema = new mongoose.Schema({
  sparq: {
    type: Number,
    required: true,
  },
  ranking: {
    type: Number,
    required: true,
  },
  player: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Player",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rank", RankSchema);
