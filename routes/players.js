const express = require("express");
const multer = require("multer");
const uuid = require("uuid").v4;

const {
  createPlayers,
  getPlayers,
} = require("../controllers/players");

const Player = require("../models/Player");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuid()}-${originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    cb(new Error("File is not a csv"), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 1000000 } });

router
  .route("/")
  .post(
    protect,
    advancedResults(Player, "season"),
    upload.single("file"),
    createPlayers
  )
  .get(protect, getPlayers);

// router.route('/:id').get(protect, advancedResults(Season, 'franchise'), getSeason)

module.exports = router;
