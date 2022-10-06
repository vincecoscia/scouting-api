const express = require("express");

const {
  getSeasons,
  getSeason,
  createSeason,
  updateSeason
} = require("../controllers/seasons");

const Season = require('../models/Season')

const router = express.Router({ mergeParams: true});

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth')

router.route("/").get(protect, advancedResults(Season, 'franchise'), getSeasons).post(protect, createSeason);

router.route('/:id').get(protect, advancedResults(Season, 'franchise'), getSeason).put(protect, advancedResults(Season, 'franchise'), updateSeason)

module.exports = router;