const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Scout = require('../models/Scout');

// @desc      Get all scouts
// @route     GET /api/v1/scouts
// @access    Public
exports.getScouts = asyncHandler(async (req, res, next) => {

  res.status(200).json(res.advancedResults);
});

// @desc      Get single scout
// @route     GET /api/v1/scouts/:id
// @access    Public
exports.getScout = asyncHandler(async (req, res, next) => {
  const scout = await Scout.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: scout
  });
});

// @desc      Create user
// @route     POST /api/v1/scouts
// @access    Private/Admin
exports.createScout = asyncHandler(async (req, res, next) => {

  if (req.user.role !== 'admin') {
    return next(new ErrorResponse(`Invalid permissions`))
  }
  const scout = await Scout.create(req.body);

  res.status(201).json({
    success: true,
    data: scout
  });
});

// @desc      Update scout
// @route     PUT /api/v1/scouts/:id
// @access    Private/Admin
exports.updateScout = asyncHandler(async (req, res, next) => {
  const scout = await Scout.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: scout
  });
});

// @desc      Delete scout
// @route     DELETE /api/v1/scouts/:id
// @access    Private/Admin
exports.deleteScout = asyncHandler(async (req, res, next) => {
  await Scout.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
