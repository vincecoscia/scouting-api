const express = require("express");

const {
  generateNews,
  getNews,
} = require("../controllers/news");

const News = require("../models/News");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect } = require("../middleware/auth");

router
  .route("/")
  .post(generateNews);

module.exports = router;