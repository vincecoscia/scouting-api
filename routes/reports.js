const express = require("express");

const {
  createReport,
  getReport,
} = require("../controllers/reports");

const Report = require('../models/Report')

const router = express.Router({ mergeParams: true});

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth')

router.route("/").post(protect, advancedResults(Report, 'season'), createReport).get(protect, advancedResults(Report, 'season'), getReport);

module.exports = router;

