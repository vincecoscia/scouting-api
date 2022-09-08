const express = require("express");

const {
  getFranchises,
  getFranchise,
  createFranchise,
  updateFranchise,
  deleteFranchise,
} = require("../controllers/franchises");

const router = express.Router();

const { protect } = require('../middleware/auth')

router.route("/").get(getFranchises).post(protect, createFranchise);

router
  .route("/:id")
  .get(getFranchise)
  .put(protect, updateFranchise)
  .delete(protect, deleteFranchise);

module.exports = router;
