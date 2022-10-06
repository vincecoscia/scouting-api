const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bucket = require('../models/Bucket');

// @desc    Get all Buckets
// @route   Get /api/v1/buckets
// @access  Private
exports.getBuckets = asyncHandler(async (req, res, next) => {
  let query;

  if (req.user.role === 'admin') {
    query = Bucket.find();
  } else {
    return next(new ErrorResponse(`Invalid permissions`));
  }

  const buckets = await query;

  res.status(200).json({
    success: true,
    count: buckets.length,
    data: buckets
  });
})

// @desc    Get one Bucket
// @route   Get /api/v1/buckets/:id
// @access  Private
exports.getBucket = asyncHandler(async (req, res, next) => {
  let query;

  if (req.user.role === 'admin') {
    query = Bucket.findById(req.params.id);
  } else {
    return next(new ErrorResponse(`Invalid permissions`));
  }

  const bucket = await query;

  res.status(200).json({
    success: true,
    data: bucket
  });
})

// @desc    Create a Bucket
// @route   POST /api/v1/buckets
// @access  Private
exports.createBucket = asyncHandler(async (req, res, next) => {
  // Make sure user is admin
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User ${req.user.id} is not authorized to update this bucket`, 401)
    );
  }

  const bucket = await Bucket.create(req.body);

  res.status(201).json({
    success: true,
    data: bucket
  });
})

// @desc    Update a Bucket
// @route   PUT /api/v1/buckets/:id
// @access  Private
exports.updateBucket = asyncHandler(async (req, res, next) => {
  let bucket = await Bucket.findById(req.params.id);

  if (!bucket) {
    return next(
      new ErrorResponse(`Bucket not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is admin
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User ${req.user.id} is not authorized to update this bucket`, 401)
    );
  }

  bucket = await Bucket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: bucket
  });
})

// @desc    Delete a Bucket
// @route   DELETE /api/v1/buckets/:id
// @access  Private
exports.deleteBucket = asyncHandler(async (req, res, next) => {
  let bucket = await Bucket.findById(req.params.id);

  if (!bucket) {
    return next(
      new ErrorResponse(`Bucket not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is admin
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User ${req.user.id} is not authorized to delete this bucket`, 401)
    );
  }

  await bucket.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
})
