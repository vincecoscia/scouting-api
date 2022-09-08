const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Franchise = require("../models/Franchise");

// @desc    Get all Franchises
// @route   Get /api/v1/franchises
// @access  Private
exports.getFranchises = asyncHandler(async (req, res, next) => {
  const franchises = await Franchise.find();

  res.status(200).json({
    success: true,
    count: franchises.length,
    data: franchises,
  });
});

// @desc    Get single Franchise
// @route   Get /api/v1/franchises/:id
// @access  Private
exports.getFranchise = asyncHandler(async (req, res, next) => {
  const franchise = await Franchise.findById(req.params.id);

  if (!franchise) {
    return next(
      new ErrorResponse(`Franchise not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: franchise });
});

// @desc    Create a Franchise
// @route   Get /api/v1/franchises
// @access  Private
exports.createFranchise = asyncHandler(async (req, res, next) => {
  const franchise = await Franchise.create(req.body);

  res.status(201).json({
    success: true,
    data: franchise,
  });
});

// @desc    Update single Franchise
// @route   Get /api/v1/franchises/:id
// @access  Private
exports.updateFranchise = asyncHandler(async (req, res, next) => {
  const franchise = await Franchise.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!franchise) {
    return next(
      new ErrorResponse(`Franchise not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: franchise });
});

// @desc    Delete single Franchise
// @route   Get /api/v1/franchises/:id
// @access  Private
exports.deleteFranchise = asyncHandler(async (req, res, next) => {
  const franchise = await Franchise.findByIdAndDelete(req.params.id);

  if (!franchise) {
    return next(
      new ErrorResponse(`Franchise not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
