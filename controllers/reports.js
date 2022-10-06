const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Report = require("../models/Report");
const Player = require("../models/Player");

// @desc    Get all Reports
// @route   Get /api/v1/Reports
// @route   Get /api/v1/user/:userId/franchises/:franchiseId/seasons/:seasonid/Report
// @access  Private
exports.getReport = asyncHandler(async (req, res, next) => {
  let query;

  // Check to make sure user has valid permissions
  if (req.user.id !== req.params.userId && req.user.role !== "admin") {
    return next(new ErrorResponse(`Invalid permissions`));
  }

  console.log(req.params);

  if (req.params.seasonId) {
    query = Report.find({ season: req.params.seasonId });
  } else if (req.user.role === "admin") {
    query = Report.find();
  } else {
    return next(new ErrorResponse(`Report not found`));
  }

  const playerReport = await query;

  res.status(200).json({
    success: true,
    data: playerReport,
  });
});

// @desc    Create a Report
// @route   POST /api/v1/user/:userId/franchise/:franchiseId/seasons/:seasonId/report
// @access  Private
exports.createReport = asyncHandler(async (req, res, next) => {
  // Attach season to report
  req.body.season = req.params.seasonId;
  // Check if user has permission to create a report
  if (req.user.id !== req.params.userId) {
    return next(new ErrorResponse(`Invalid permissions`));
  }
  // Query players in season
  let playerQuery = Player.find({ season: req.body.season });
  const players = await playerQuery;

  // Check if players are uploaded
  if (players.length <= 0) {
    return next(new ErrorResponse(`Please add players to this season to generate a report`));
  }
  // Check if a report already exists with a season ID
  let reportQuery = Report.find({ season: req.body.season })
  const reports = await reportQuery

  if (reports.length > 0) {
    return next(new ErrorResponse(`A report has already been generated for this season`));
  }

  // Filter each position
  const qb = players.filter(player => player.Position === 'QB');
  const hb = players.filter(player => player.Position === 'HB');
  const wr = players.filter(player => player.Position === 'WR');
  const te = players.filter(player => player.Position === 'TE');
  const lt = players.filter(player => player.Position === 'LT');
  const lg = players.filter(player => player.Position === 'LG');
  const ce = players.filter(player => player.Position === 'C');
  const rg = players.filter(player => player.Position === 'RG');
  const rt = players.filter(player => player.Position === 'RT');

  const offenseFilter = new Set(['QB', 'HB', 'WR', 'TE', 'LT', 'LG', 'C', 'RG', 'RT']);

  const le = players.filter(player => player.Position === 'LE');
  const re = players.filter(player => player.Position === 'RE');
  const dt = players.filter(player => player.Position === 'DT');
  const lolb = players.filter(player => player.Position === 'LOLB');
  const rolb = players.filter(player => player.Position === 'ROLB');
  const mlb = players.filter(player => player.Position === 'MLB');
  const cb = players.filter(player => player.Position === 'CB');
  const fs = players.filter(player => player.Position === 'FS');
  const ss = players.filter(player => player.Position === 'SS');

  const ki = players.filter(player => player.Position === 'K');
  const pu = players.filter(player => player.Position === 'P');
  const fb = players.filter(player => player.Position === 'FB');

  const defenseFilter = new Set(['LE', 'RE', 'DT', 'LOLB', 'ROLB', 'MLB', 'CB', 'FS', 'SS']);

  const offense = players.filter(({ Position }) => offenseFilter.has(Position));
  const defense = players.filter(({ Position }) => defenseFilter.has(Position)); 

  // Get averages
  const avgOverall = Math.round(players.reduce((total, next) => total + next.OverallRating, 0) * 10 / players.length) / 10;
  const avgOffense = Math.round(offense.reduce((total, next) => total + next.OverallRating, 0) * 10 / offense.length) / 10;
  const avgDefense = Math.round(defense.reduce((total, next) => total + next.OverallRating, 0) * 10 / defense.length) / 10;
  const avgQb = Math.round(qb.reduce((total, next) => total + next.OverallRating, 0) * 10 / qb.length) / 10;
  const avgHb = Math.round(hb.reduce((total, next) => total + next.OverallRating, 0) * 10 / hb.length) / 10;
  const avgWr = Math.round(wr.reduce((total, next) => total + next.OverallRating, 0) * 10 / wr.length) / 10;
  const avgTe = Math.round(te.reduce((total, next) => total + next.OverallRating, 0) * 10 / te.length) / 10;
  const avgLt = Math.round(lt.reduce((total, next) => total + next.OverallRating, 0) * 10 / lt.length) / 10;
  const avgLg = Math.round(lg.reduce((total, next) => total + next.OverallRating, 0) * 10 / lg.length) / 10;
  const avgCe = Math.round(ce.reduce((total, next) => total + next.OverallRating, 0) * 10 / ce.length) / 10;
  const avgRg = Math.round(rg.reduce((total, next) => total + next.OverallRating, 0) * 10 / rg.length) / 10;
  const avgRt = Math.round(rt.reduce((total, next) => total + next.OverallRating, 0) * 10 / rt.length) / 10;

  const avgLe = Math.round(le.reduce((total, next) => total + next.OverallRating, 0) * 10 / le.length) / 10;
  const avgRe = Math.round(re.reduce((total, next) => total + next.OverallRating, 0) * 10 / re.length) / 10;
  const avgDt = Math.round(dt.reduce((total, next) => total + next.OverallRating, 0) * 10 / dt.length) / 10;
  const avgLolb = Math.round(lolb.reduce((total, next) => total + next.OverallRating, 0) * 10 / lolb.length) / 10;
  const avgRolb = Math.round(rolb.reduce((total, next) => total + next.OverallRating, 0) * 10 / rolb.length) / 10;
  const avgMlb = Math.round(mlb.reduce((total, next) => total + next.OverallRating, 0) * 10 / mlb.length) / 10;
  const avgCb = Math.round(cb.reduce((total, next) => total + next.OverallRating, 0) * 10 / cb.length) / 10;
  const avgFs = Math.round(fs.reduce((total, next) => total + next.OverallRating, 0) * 10 / fs.length) / 10;
  const avgSs = Math.round(ss.reduce((total, next) => total + next.OverallRating, 0) * 10 / ss.length) / 10;

  const avgKi = Math.round(ki.reduce((total, next) => total + next.OverallRating, 0) * 10 / ki.length) / 10;
  const avgPu = Math.round(pu.reduce((total, next) => total + next.OverallRating, 0) * 10 / pu.length) / 10;
  const avgFb = Math.round(fb.reduce((total, next) => total + next.OverallRating, 0) * 10 / fb.length) / 10;

  // Get Best and Worst positions
  let positions = [
    {avg: avgQb, position: 'QB'},
    {avg: avgHb, position: 'HB'},
    {avg: avgWr, position: 'WR'},
    {avg: avgTe, position: 'TE'},
    {avg: avgLt, position: 'LT'},
    {avg: avgLg, position: 'LG'},
    {avg: avgCe, position: 'C'},
    {avg: avgRg, position: 'RG'},
    {avg: avgRt, position: 'RT'},
    {avg: avgLe, position: 'LE'},
    {avg: avgRe, position: 'RE'},
    {avg: avgDt, position: 'DT'},
    {avg: avgLolb, position: 'LOLB'},
    {avg: avgRolb, position: 'ROLB'},
    {avg: avgMlb, position: 'MLB'},
    {avg: avgCb, position: 'CB'},
    {avg: avgFs, position: 'FS'},
    {avg: avgSs, position: 'SS'},
  ];

  const bestArr = positions.sort((a, b) => b.avg - a.avg).slice(0,3)
  const worstArr = positions.sort((a, b) => a.avg - b.avg).slice(0,3)

  const bestPos = bestArr.map(pos => pos.position)
  const worstPos = worstArr.map(pos => pos.position)

  // Add all fields to request object
  req.body.avgOverall = avgOverall
  req.body.offenseOverall = avgOffense
  req.body.defenseOverall = avgDefense
  req.body.best = bestPos
  req.body.worst = worstPos
  req.body.qbOverall = avgQb
  req.body.hbOverall = avgHb
  req.body.wrOverall = avgWr
  req.body.teOverall = avgTe
  req.body.ltOverall = avgLt
  req.body.lgOverall = avgLg
  req.body.ceOverall = avgCe
  req.body.rgOverall = avgRg
  req.body.rtOverall = avgRt
  req.body.leOverall = avgLe
  req.body.reOverall = avgRe
  req.body.dtOverall = avgDt
  req.body.lolbOverall = avgLolb
  req.body.rolbOverall = avgRolb
  req.body.mlbOverall = avgMlb
  req.body.cbOverall = avgCb
  req.body.fsOverall = avgFs
  req.body.ssOverall = avgSs
  req.body.kiOverall = avgKi
  req.body.puOverall = avgPu
  req.body.fbOverall = avgFb

  const report = await Report.create(req.body);

  res.status(201).json({
    success: true,
    data: report,
  });
});
