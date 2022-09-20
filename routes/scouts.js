const express = require('express');
const {
  getScouts,
  getScout,
  createScout,
  updateScout,
  deleteScout
} = require('../controllers/scouts');

const Scout = require('../models/Scout')

const router = express.Router({ mergeParams: true});

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect)

router
  .route('/')
  .get(advancedResults(Scout), getScouts)
  .post(authorize('admin'), createScout);

router
  .route('/:id')
  .get(getScout)
  .put(authorize('admin'), updateScout)
  .delete(authorize('admin'), deleteScout);

module.exports = router;