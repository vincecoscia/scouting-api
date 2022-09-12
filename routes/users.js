const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

const User = require('../models/User')

// Include other resource routers
const franchiseRouter = require('./franchises')
const seasonRouter = require('./seasons')

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:userId/franchises', franchiseRouter)
router.use('/:userId/franchises/:franchiseId/seasons', seasonRouter)

router
  .route('/')
  .get(protect, advancedResults(User, 'franchises'), getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;