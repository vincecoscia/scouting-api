const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const openaiResponse = require('../utils/openai');
const News = require('../models/News');

// @desc    Get all News from a Season
// @route   Get /api/v1/seasons/:seasonId/news
// @access  Private
exports.getNews = asyncHandler(async (req, res, next) => {
  let query;
  // Find season by id
  let season = await Season.findById(req.params.seasonId);

  if (!season) {
    return next(
      new ErrorResponse(`Season not found with id of ${req.params.seasonId}`, 404)
    );
  }

  // Get all news from season
  query = News.find({ season: req.params.seasonId });

  const news = await query;

  res.status(200).json({
    success: true,
    count: news.length,
    data: news
  });
})

// @desc    Get news from player
// @route   Get /api/v1/players/:playerId/news
// @access  Private
exports.getPlayerNews = asyncHandler(async (req, res, next) => {
  let query;
  // Find player by id
  let player = await Player.findById(req.params.playerId);

  if (!player) {
    return next(
      new ErrorResponse(`Player not found with id of ${req.params.playerId}`, 404)
    );
  }

  // Get all news from player
  query = News.find({ player: req.params.playerId });

  const news = await query;

  res.status(200).json({
    success: true,
    count: news.length,
    data: news
  });
})

// @desc    Generate News for a Season and Player
// @route   POST /api/v1/seasons/:seasonId/players/news
// @access  Private
exports.generateNews = asyncHandler(async (req, res, next) => {
  // Find season by id
  // let season = await Season.findById(req.params.seasonId);

  // if (!season) {
  //   return next(
  //     new ErrorResponse(`Season not found with id of ${req.params.seasonId}`, 404)
  //   );
  // }

  // Create a function that loops over all players in a season and generates news for them
  // const generateNewsForPlayer = async (player) => {

  
  
  // Use OpenAI to generate news for a player
  const openAI = await openaiResponse(options);

  // Create news
  const news = await News.create({
    title,
    body,
    // player: req.params.playerId,
    // season: req.params.seasonId
  });

  res.status(200).json({
    success: true,
    data: news
  });
})



