const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Info = require("../models/Info");
const Scout = require("../models/Scout");
const Franchise = require("../models/Franchise");
const Player = require("../models/Player");
const Bucket = require("../models/Bucket");

// @desc    Get all Info
// @route   Get /api/v1/info
// @access  Private
exports.getInfos = asyncHandler(async (req, res, next) => {
  let query;

  if (req.user.role === "admin") {
    query = Info.find();
  } else {
    return next(new ErrorResponse(`Invalid permissions`));
  }

  const infos = await query;

  res.status(200).json({
    success: true,
    count: infos.length,
    data: infos,
  });
});

// @desc    Create Info
// @route   POST /api/v1/user/:userId/franchises/:franchiseId/players/:playerId/info/
// @access  Public
exports.createInfo = asyncHandler(async (req, res, next) => {
  // Check if info exists for this player
  let info = await Info.findOne({
    player: req.params.playerId,
  });

  // identify the franchise
  let franchise = await Franchise.findById(req.params.franchiseId);

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

  // Make sure scout is in the req.body
  if (!req.body.scout) {
    return next(
      new ErrorResponse(
        `No scout assigned to this player. Please assign a scout.`,
        404
      )
    );
  }

  // idenify the scout who is creating the info through the franchise
  let scout = await Scout.findById(req.body.scout);

  // Map over franchise.scouts and turn them to strings and store in an array
  let franchiseScouts = franchise.scouts.map((scout) => scout.toString());

  // Make sure scout belongs to the franchise
  if (!franchiseScouts.includes(scout.id)) {
    return next(
      new ErrorResponse(
        `The scout ${scout.firstName} ${scout.lastName} is not assigned to this franchise`,
        404
      )
    );
  }

  // Make sure hours in req.body does not exceed scout's hours
  if (req.body.hours > scout.hours) {
    return next(
      new ErrorResponse(
        `The scout ${scout.firstName} ${scout.lastName} does not have enough hours to complete this assignment`,
        404
      )
    );
  }

  // identify the player
  const player = await Player.findById(req.params.playerId);

  if (!player) {
    return next(
      new ErrorResponse(
        `Player not found with id of ${req.params.playerId}`,
        404
      )
    );
  }

  // Attach player to req.body
  req.body.player = req.params.playerId;

  // Create variable for specific positional bucket
  let positionBucket;

  // Check position of player and assign positionBucket
  if (player.Position.includes("RT" || "LT" || "RG" || "LG" || "C")) {
    positionBucket = "OL";
  } else if (player.Position.includes("RE" || "LE" || "DT")) {
    positionBucket = "DL";
  } else if (player.Position.includes("MLB" || "LOLB" || "ROLB")) {
    positionBucket = "LB";
  } else if (player.Position.includes("FS" || "SS")) {
    positionBucket = "S";
  } else if (player.Position.includes("K" || "P")) {
    positionBucket = "K";
  } else {
    positionBucket = player.Position;
  }

  // identify the bucket
  let bucket = await Bucket.findOne({ position: positionBucket });

  // If no bucket exists for this position throw an error
  if (!bucket) {
    return next(
      new ErrorResponse(
        `No bucket exists for this position. Please create a bucket for ${positionBucket}`,
        404
      )
    );
  }
  // Attach bucket to req.body
  req.body.bucket = bucket.id;

  // Get relevant stats from bucket and player
  let relevantStats = bucket.relevantStats.map((el) =>
    Object.fromEntries(
      Object.entries(player._doc).filter(([key]) => key.includes(el))
    )
  );

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

  // Determine Sparq score based on player attributes
  let sparqScore = Math.floor(
    (player.SpeedRating +
      player.AccelerationRating +
      player.AgilityRating +
      player.ChangeOfDirectionRating +
      player.StrengthRating +
      player.JumpingRating) /
      6
  );

  // Attach Sparq score to req.body
  req.body.sparq = sparqScore;

  // create function that returns 1 or -1
  function plusOrMinus() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  // generate the info based on scout and player
  function generateInfo(player, scout) {
    let tempOverall;
    if (scout.bias === "Potential") {
      tempOverall =
        player.OverallRating + devTraitToNumber(player.TraitDevelopment);
    } else if (scout.bias === "Athleticism") {
      tempOverall = player.OverallRating + (sparqScore > 50 ? 5 : 0);
    } else {
      tempOverall = player.OverallRating;
    }

    if (scout.evaluation === 4) {
      let overall = tempOverall + plusOrMinus() * Math.floor(Math.random() * 3);
      // Attach overall to req.body
      req.body.OverallRating = overall;
      // Change values in relevantStats to a number based on scout evaluation
      let scoutedStats = relevantStats.map((el) =>
        Object.fromEntries(
          Object.entries(el).map(([key, value]) => [
            key,
            value + plusOrMinus() * Math.floor(Math.random() * 3),
          ])
        )
      );
      // Attach scoutedStats to req.body by adding key value pairs
      // scoutedStats.forEach((el) => Object.assign(req.body, el));
      // Add scoutedStats to req.body.stats array
      console.log(scoutedStats);
      req.body.stats = scoutedStats;
    } else if (scout.evaluation === 3) {
      let overall = tempOverall + plusOrMinus() * Math.floor(Math.random() * 5);
      req.body.OverallRating = overall;
      // Change values in relevantStats to a number based on scout evaluation
      let scoutedStats = relevantStats.map((el) =>
        Object.fromEntries(
          Object.entries(el).map(([key, value]) => [
            key,
            value + plusOrMinus() * Math.floor(Math.random() * 5),
          ])
        )
      );
      // Attach scoutedStats to req.body (If change is needed code can be found in evaluation === 4)
      req.body.stats = scoutedStats;
    } else if (scout.evaluation === 2) {
      let overall =
        tempOverall + plusOrMinus() * Math.floor(Math.random() * 10);
      req.body.OverallRating = overall;
      // Change values in relevantStats to a number based on scout evaluation
      let scoutedStats = relevantStats.map((el) =>
        Object.fromEntries(
          Object.entries(el).map(([key, value]) => [
            key,
            value + plusOrMinus() * Math.floor(Math.random() * 10),
          ])
        )
      );
      // Attach scoutedStats to req.body (If change is needed code can be found in evaluation === 4)
      req.body.stats = scoutedStats;
    } else {
      let overall =
        tempOverall + plusOrMinus() * Math.floor(Math.random() * 15);
      req.body.OverallRating = overall;
      // Change values in relevantStats to a number based on scout evaluation
      let scoutedStats = relevantStats.map((el) =>
        Object.fromEntries(
          Object.entries(el).map(([key, value]) => [
            key,
            value + plusOrMinus() * Math.floor(Math.random() * 15),
          ])
        )
      );
      // Attach scoutedStats to req.body (If change is needed code can be found in evaluation === 4)
      req.body.stats = scoutedStats;
    }
  }

  generateInfo(player, scout);

  let newHours

  // Add hours to existing hours
  if (info) {
    newHours = info.hours + req.body.hours;
    newPercent = newHours * 2;
  } else {
    req.body.percent = req.body.hours * 2;
  }

  console.log(newHours);
  // If info exists, only update hours and percentage
  if (info) {
    info = await Info.findOneAndUpdate(
      { player: req.params.playerId },
      { hours: newHours, percent: newPercent },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    // If info does not exist, create it
    info = await Info.create(req.body);
  }

  res.status(200).json({
    success: true,
    data: info,
  });
});
