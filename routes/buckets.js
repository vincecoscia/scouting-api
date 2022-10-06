const express = require("express");

const {
  getBuckets,
  getBucket,
  createBucket,
  updateBucket,
  deleteBucket
} = require("../controllers/buckets");

const router = express.Router();

const { protect, authorize } = require('../middleware/auth')

router.use(protect)
router.use(authorize('admin'))

router.route("/").get(getBuckets).post(createBucket);
router.route('/:id').get(getBucket).put(updateBucket).delete(deleteBucket)

module.exports = router;