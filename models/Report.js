const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  avgOverall: {
    type: Number
  },
  offenseOverall: {
    type: Number
  },
  defenseOverall: {
    type: Number
  },
  qbOverall: {
    type: Number
  },
  hbOverall: {
    type: Number
  },
  wrOverall: {
    type: Number
  },
  teOverall: {
    type: Number
  },
  ltOverall: {
    type: Number
  },
  lgOverall: {
    type: Number
  },
  ceOverall: {
    type: Number
  },
  rgOverall: {
    type: Number
  },
  rtOverall: {
    type: Number
  },
  reOverall: {
    type: Number
  },
  leOverall: {
    type: Number
  },
  dtOverall: {
    type: Number
  },
  lolbOverall: {
    type: Number
  },
  rolbOverall: {
    type: Number
  },
  mlbOverall: {
    type: Number
  },
  cbOverall: {
    type: Number
  },
  fsOverall: {
    type: Number
  },
  ssOverall: {
    type: Number
  },
  kiOverall: {
    type: Number
  },
  puOverall: {
    type: Number
  },
  fbOverall: {
    type: Number
  },
  season: {
    type: mongoose.Schema.ObjectId,
    ref: "Season",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", ReportSchema);
