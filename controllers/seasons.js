const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Season = require("../models/Season");

// @desc    Get all Seasons
// @route   Get /api/v1/seasons
// @route   Get /api/v1/user/:userId/franchises/:franchiseId/seasons
// @access  Private
exports.getSeasons = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.franchiseId) {
    query = Season.find({ franchise: req.params.franchiseId });
  } else if(req.user.role === 'admin') {
    query = Season.find();
  } else {
    return next(new ErrorResponse(`Invalid permissions`))
  }

  const seasons = await query;

  res.status(200).json({
    success: true,
    count: seasons.length,
    data: seasons,
  });
});

// @desc    Get one Season
// @route   Get /api/v1/seasons/:d
// @route   Get /api/v1/user/:userId/franchises/:franchiseId/seasons/:id
// @access  Private
exports.getSeason = asyncHandler(async (req, res, next) => {
  let query;

  if(req.user.id !== req.params.userId && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Invalid permissions`))
  }

  if (req.user.id === req.params.userId || req.user.role === 'admin') {
    query = Season.findById(req.params.id);
  } else {
    return next(new ErrorResponse(`Invalid permissions`))
  }

  const season = await query;

  res.status(200).json({
    success: true,
    data: season,
  });
});

// @desc    Create a Season
// @route   POST /api/v1/user/:userId/franchise/:franchiseId/seasons
// @access  Private
exports.createSeason = asyncHandler(async (req, res, next) => {
  // Add user and franchise to req.body

  req.body.user = req.user.id;
  req.body.franchise = req.params.franchiseId

  console.log(req.params)

  if(req.user.id !== req.params.userId) {
    return next(new ErrorResponse(`Invalid permissions`))
  }

  const season = await Season.create(req.body);

  res.status(201).json({
    success: true,
    data: season,
  });
});