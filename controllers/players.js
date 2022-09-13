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
  console.log(req.file)

  csvtojson()
    .fromFile(`uploads/${req.file.filename}`)
    .then(csvData => {
      Player.insertMany(csvData).then(async () => {
        console.log("Data inserted")
        await unlinkAsync(req.file.path)
        res.status(201).json({ success: true })
      }).catch(function (err) {
        console.log(err)
      } )
    } )


  // const players = await Season.create(req.body);

  // res.status(201).json({
  //   success: true,
  //   data: players,
  // });
});