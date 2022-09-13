const ErrorResponse = require("../utils/errorResponse");
const fs = require('fs')
const asyncHandler = require("../middleware/async");
const csvtojson = require("csvtojson")
const { promisify } = require('util')
const Player = require("../models/Player");

const unlinkAsync = promisify(fs.unlink)

// @desc    Create players
// @route   POST /api/v1/user/:userId/franchise/:franchiseId/seasons
// @route   POST /api/v1/players
// @access  Private
exports.createPlayers = asyncHandler(async (req, res, next) => {
  // console.log(req.file)

  req.body.user = req.user.id;
  req.body.franchise = req.params.franchiseId
  req.body.season = req.params.seasonId

  const unlink = async () => {
    await unlinkAsync(req.file.path)
  }

  if(req.user.id !== req.params.userId) {
    unlink()
    return next(new ErrorResponse(`Invalid permissions`))
  }
          
  csvtojson()
    .fromFile(`uploads/${req.file.filename}`)
    .then(csvData => {
      const players = csvData.map(data => ({ ...data, season: req.body.season, franchise: req.body.franchise, user: req.body.user}))
      Player.insertMany(players).then(async () => {
        console.log("Data inserted")
        await unlinkAsync(req.file.path)
        res.status(201).json({ success: true })
      }).catch(function (err) {
        console.log(err)
      } )
    })
});

// @desc    Get all Players (Filter by Season, Franchise, & User)
// @route   Get /api/v1/players
// @route   Get /api/v1/user/:userId/franchises/:franchiseId/seasons/:seasonsId/players
// @route   Get /api/v1/user/:userId/franchises/:franchiseId/players
// @route   Get /api/v1/user/:userId/players
// @access  Private
exports.getPlayers = asyncHandler(async (req, res, next) => {
  let query;

  // Check to make sure user has valid permissions
  if(req.user.id !== req.params.userId && req.user.role !== "admin") {
    return next(new ErrorResponse(`Invalid permissions`))
  }

  console.log(req.params)

  if (req.params.seasonId) {
    query = Player.find({ season: req.params.seasonId });
  } else if (!req.params.seasonId) {
    query = Player.find({ franchise: req.params.franchiseId });
  } else if (!req.params.seasonId && !req.params.franchiseId) {
    query = Player.find({ user: req.params.userId });
  } else if(req.user.role === 'admin') {
    query = Player.find();
  } else {
    return next(new ErrorResponse(`Players not found`))
  }

  const players = await query;

  res.status(200).json({
    success: true,
    count: players.length,
    data: players,
  });
})