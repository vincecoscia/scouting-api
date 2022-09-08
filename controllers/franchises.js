const ErrorResponse = require('../utils/errorResponse');
const Franchise = require('../models/Franchise')

// @desc    Get all Franchises
// @route   Get /api/v1/franchises
// @access  Private
exports.getFranchises = async (req, res, next) => {
  try {
    const franchises = await Franchise.find();

    res.status(200).json({
      success: true, count: franchises.length, data: franchises
    })
  } catch (err) {
    next(err)
  }
}

// @desc    Get single Franchise
// @route   Get /api/v1/franchises/:id
// @access  Private
exports.getFranchise = async (req, res, next) => {
  try {
    const franchise = await Franchise.findById(req.params.id)

    if(!franchise){
      return next(new ErrorResponse(`Franchise not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({ success: true, data: franchise })
  } catch (err) {
    next(err)
  }
}

// @desc    Create a Franchise
// @route   Get /api/v1/franchises
// @access  Private
exports.createFranchise = async (req, res, next) => {
  try {
    const franchise = await Franchise.create(req.body)

    res.status(201).json({
      success: true,
      data: franchise
    })
  } catch (err) {
    next(err)
  }

}

// @desc    Update single Franchise
// @route   Get /api/v1/franchises/:id
// @access  Private
exports.updateFranchise = async (req, res, next) => {
  try {
    const franchise = await Franchise.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if(!franchise){
      return next(new ErrorResponse(`Franchise not found with id of ${req.params.id}`, 404))
    }
  
    res.status(200).json({ success: true, data: franchise})
  } catch (err) {
    next(err)
  }

}

// @desc    Delete single Franchise
// @route   Get /api/v1/franchises/:id
// @access  Private
exports.deleteFranchise = async (req, res, next) => {
  try {
    const franchise = await Franchise.findByIdAndDelete(req.params.id);
    
    if(!franchise){
      return next(new ErrorResponse(`Franchise not found with id of ${req.params.id}`, 404))
    }
  
    res.status(200).json({ success: true, data: {}})
  } catch (err) {
    next(err)
  }
}