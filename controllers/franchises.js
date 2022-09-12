const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Franchise = require("../models/Franchise");

// @desc    Get all Franchises
// @route   Get /api/v1/franchises
// @route   Get /api/v1/user/:userId/franchises
// @access  Private
exports.getFranchises = asyncHandler(async (req, res, next) => {
  let query;

  console.log(req.user);

  if (req.params.userId) {
    query = Franchise.find({ user: req.params.userId });
  } else if(req.user.role === 'admin') {
    query = Franchise.find();
  } else {
    return next(new ErrorResponse(`Invalid permissions`))
  }

  // const franchises = await Franchise.find();

  const franchises = await query;

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

    // Make sure user is franchise owner
    if (franchise.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorResponse(
          `User ${req.params.id} is not authorized to view this franchise`,
          404
        )
      );
    }

  res.status(200).json({ success: true, data: franchise });
});

// @desc    Create a Franchise
// @route   Get /api/v1/franchises
// @access  Private
exports.createFranchise = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

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
  let franchise = await Franchise.findById(req.params.id);

  if (!franchise) {
    return next(
      new ErrorResponse(`Franchise not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is franchise owner
  if (franchise.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this franchise`,
        404
      )
    );
  }

  franchise = await Franchise.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: franchise });
});

// @desc    Delete single Franchise
// @route   Get /api/v1/franchises/:id
// @access  Private
exports.deleteFranchise = asyncHandler(async (req, res, next) => {
  let franchise = await Franchise.findById(req.params.id);

  if (!franchise) {
    return next(
      new ErrorResponse(`Franchise not found with id of ${req.params.id}`, 404)
    );
  }

  console.log(`FRANCHISE: ${franchise.user.toString()}`)
  console.log(`REQUEST: ${req.user.id}`)

  // Make sure user is franchise owner
  if (franchise.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this franchise`,
        404
      )
    );
  }

  franchise = await Franchise.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, data: {} });
});
