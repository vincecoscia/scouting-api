const express = require("express");

const {
  getInfos,
  createInfo,
} = require("../controllers/info");

const Info = require('../models/Info')

const router = express.Router({ mergeParams: true});

const advancedResults = require('../middleware/advancedResults');

const { protect } = require('../middleware/auth')

router.route("/").get(protect, getInfos).post(protect, createInfo);

module.exports = router;