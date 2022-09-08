const Franchise = require('../models/Franchise')

// @desc    Get all Franchises
// @route   Get /api/v1/franchises
// @access  Private
exports.getFranchises = async (req, res, next) => {
  try {
    const franchises = await Franchise.find();

    res.status(200).json({
      success: true, data: franchises
    })
  } catch (error) {
    res.status(400).json({ success: false})
  }
}

// @desc    Get single Franchise
// @route   Get /api/v1/franchises/:id
// @access  Private
exports.getFranchise = async (req, res, next) => {
  try {
    const franchise = await Franchise.findById(req.params.id)

    if(!franchise){
      return res.status(400).json({ success: false})
    }

    res.status(200).json({ success: true, data: franchise })
  } catch (error) {
    res.status(400).json({ success: false })
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
    res.status(400).json({ success: false})
  }

}

// @desc    Update single Franchise
// @route   Get /api/v1/franchises/:id
// @access  Private
exports.updateFranchise = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update franchise ${req.params.id}`})
}

// @desc    Delete single Franchise
// @route   Get /api/v1/franchises/:id
// @access  Private
exports.deleteFranchise = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete franchise ${req.params.id}`})
}