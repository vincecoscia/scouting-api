const express = require("express");

const {
  getFranchises,
  getFranchise,
  createFranchise,
  updateFranchise,
  deleteFranchise,
} = require("../controllers/franchises");

const Franchise = require('../models/Franchise')

const router = express.Router({ mergeParams: true});

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth')

router.route("/").get(protect, advancedResults(Franchise, 'user'), getFranchises).post(protect, createFranchise);

router
  .route("/:id")
  .get(protect, getFranchise)
  .put(protect, updateFranchise)
  .delete(protect, deleteFranchise);

module.exports = router;
