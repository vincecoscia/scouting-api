const express = require("express");

const {
  getFranchises,
  getFranchise,
  createFranchise,
  updateFranchise,
  deleteFranchise,
} = require("../controllers/franchises");

const router = express.Router();

router.route("/").get(getFranchises).post(createFranchise);

router
  .route("/:id")
  .get(getFranchise)
  .put(updateFranchise)
  .delete(deleteFranchise);

module.exports = router;
