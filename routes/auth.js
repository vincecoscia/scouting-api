const express = require("express");
const { register, login, getMe } = require("../controllers/auth");

// // Include other resource routers
// const franchiseRouter = require('./franchises')

const router = express.Router();

// Re-route into other resource routers
// router.use('/:userId/franchises', franchiseRouter)

const { protect } = require('../middleware/auth')

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
