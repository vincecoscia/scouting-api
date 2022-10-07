const express = require("express");

const {
  getRanks,
  createRanks,
} = require("../controllers/rank");

const Rank = require("../models/Rank");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");

const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(protect, advancedResults(Rank), getRanks)
  .post(protect, createRanks);

module.exports = router;