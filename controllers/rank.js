const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Rank = require("../models/Rank");
const Scout = require("../models/Scout");
const Franchise = require("../models/Franchise");
const Player = require("../models/Player");
const Season = require("../models/Season");
const Bucket = require("../models/Bucket");

// @desc    Get all Ranks
// @route    Get /api/v1/user/:userId/franchises/:franchiseId/seasons/:seasonsId/players/:playerId/rank
// @route    Get /api/v1/user/:userId/franchises/:franchiseId/seasons/rank
// @access  Public
exports.getRanks = asyncHandler(async (req, res, next) => {
  // identify the franchise
  let franchise = await Franchise.findById(req.params.franchiseId);

  // Check if franchise exists
  if (!franchise) {
    return next(
      new ErrorResponse(
        `Franchise not found with id of ${req.params.franchiseId}`,
        404
      )
    );
  }

  // Make sure user is franchise owner
  if (franchise.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to view this franchise`,
        401
      )
    );
  }

  // Check if season exists
  let season = await Season.findById(req.params.seasonId);

  if (!season) {
    return next(
      new ErrorResponse(
        `Season not found with id of ${req.params.seasonId}`,
        404
      )
    );
  }

  // Get all ranks for by seasonId
  let query = Rank.find({
    season: req.params.seasonId,
  });

  const ranks = await query;

  res.status(200).json({
    success: true,
    count: ranks.length,
    data: ranks,
  });
});

// @desc    Create All Ranks
// @route   POST /api/v1/user/:userId/franchises/:franchiseId/seasons/:seasonId/rank
// @access  Public
exports.createRanks = asyncHandler(async (req, res, next) => {
  // Check if rank already exists for this season
  let rank = await Rank.find({
    season: req.params.seasonId,
  });

  console.log(rank);

  if (rank.length > 0) {
    return next(
      new ErrorResponse(`Rankings already exist for this season`, 400)
    );
  }

  // identify the franchise
  let franchise = await Franchise.findById(req.params.franchiseId);

  // Check if franchise exists
  if (!franchise) {
    return next(
      new ErrorResponse(
        `Franchise not found with id of ${req.params.franchiseId}`,
        404
      )
    );
  }

  // Make sure user is franchise owner
  if (franchise.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to view this franchise`,
        401
      )
    );
  }

  // Check if season exists
  let season = await Season.findById(req.params.seasonId);

  if (!season) {
    return next(
      new ErrorResponse(
        `Season not found with id of ${req.params.seasonId}`,
        404
      )
    );
  }

  // Assign a scout determine ranks
  let scout = await Scout.findById(req.body.scoutId);

  if (!scout) {
    return next(
      new ErrorResponse(`Scout not found with id of ${req.params.scoutId}`, 404)
    );
  }

  // get all players for season
  let players = await Player.find({
    season: req.params.seasonId,
  });

  // create function that returns 1 or -1
  function plusOrMinus() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  // Assign player.TraitDevelopment to a number using a function
  devTraitToNumber = (trait) => {
    switch (trait) {
      case "Normal":
        return 0;
      case "Star":
        return 1;
      case "Superstar":
        return 2;
      case "Xfactor":
        return 3;
      default:
        return 0;
    }
  };

  // Create a function that gets sparq score for a player
  getSparq = (player) => {
    let sparq = Math.floor(
      (player.SpeedRating +
        player.AccelerationRating +
        player.AgilityRating +
        player.ChangeOfDirectionRating +
        player.StrengthRating +
        player.JumpingRating) /
        6
    );
    return sparq;
  };

  // Create a function that returns a value based on sparq score using switch statement
  const sparqToNumber = (sparq) => {
    switch (true) {
      case sparq <= 50:
        return -5;
      case sparq <= 55:
        return -4;
      case sparq <= 60:
        return -3;
      case sparq <= 65:
        return -2;
      case sparq <= 70:
        return -1;
      case sparq <= 75:
        return 0;
      case sparq <= 80:
        return 1;
      case sparq <= 85:
        return 2;
      case sparq <= 90:
        return 3;
      case sparq <= 95:
        return 4;
      case sparq <= 100:
        return 5;
    }
  };

  // generate the overall based on scout and player
  function generateOverall(player, scout) {
    // Determine Sparq score based on player attributes
    let sparqScore = getSparq(player);

    let tempOverall;
    let finalOverall;
    if (scout.bias === "Potential") {
      tempOverall =
        player.OverallRating + devTraitToNumber(player.TraitDevelopment);
    } else if (scout.bias === "Athleticism") {
      tempOverall = player.OverallRating + sparqToNumber(sparqScore);
    } else {
      tempOverall = player.OverallRating;
    }

    if (scout.evaluation === 4) {
      let overall = tempOverall + plusOrMinus() * Math.floor(Math.random() * 3);
      finalOverall = overall;
    } else if (scout.evaluation === 3) {
      let overall = tempOverall + plusOrMinus() * Math.floor(Math.random() * 5);
      finalOverall = overall;
    } else if (scout.evaluation === 2) {
      let overall =
        tempOverall + plusOrMinus() * Math.floor(Math.random() * 10);
      finalOverall = overall;
    } else {
      let overall =
        tempOverall + plusOrMinus() * Math.floor(Math.random() * 15);
      finalOverall = overall;
    }
    return finalOverall;
  }

  // loop through players and ranking from 1 to players.length based on generateOverall function and store in array
  let overallArray = [];
  for (let i = 0; i < players.length; i++) {
    let initialRank = {
      playerId: players[i]._id,
      overall: generateOverall(players[i], scout),
      sparq: getSparq(players[i]),
    };
    overallArray.push(initialRank);
  }

  // console.log(overallArray);

  sortedRanking = overallArray.sort(function (a, b) {
    return b.overall - a.overall;
  });

  // console.log(sortedRanking);

  // loop through sortedRanking and assign rank and store in array
  let rankArray = [];
  for (let i = 0; i < sortedRanking.length; i++) {
    let ranking = {
      season: req.params.seasonId,
      player: sortedRanking[i].playerId,
      overall: sortedRanking[i].overall,
      sparq: sortedRanking[i].sparq,
      ranking: i + 1,
      scout: req.body.scoutId,
    };
    rankArray.push(ranking);
  }

  rankArray.forEach(async (rank) => {
    await Rank.create(rank);
  });

  res.status(200).json({
    success: true,
    length: rankArray.length,
    data: rankArray,
  });

  // loop through players and create ranking based on scout.evaluation and scout.bias
  // players.forEach(async (player) => {
  //   let rank = await Rank.create({
  //     player: player._id,
  //     season: season._id,
  //     ranking: scout.evaluation * player.OverallRating + scout.bias,
  //   });
  // });
});
