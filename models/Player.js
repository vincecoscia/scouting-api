const mongoose = require("mongoose");
const slugify = require("slugify");

const PlayerSchema = new mongoose.Schema({
  FirstName: { type: String, trim: true },
  LastName: { type: String, trim: true },
  Position: { type: String, trim: true },
  College: { type: String, trim: true },
  Age: { type: Number, trim: true },
  Height: { type: Number, trim: true },
  Weight: { type: Number, trim: true },
  OverallRating: { type: Number, max: 100, trim: true },
  TraitDevelopment: { type: String, trim: true },
  ContractStatus: { type: String, trim: true },
  Motivation3: { type: String, trim: true },
  Motivation2: { type: String, trim: true },
  Motivation1: { type: String, trim: true },
  OriginalHitPowerRating: { type: Number, max: 100, trim: true },
  OriginalJumpingRating: { type: Number, max: 100, trim: true },
  AgilityRating: { type: Number, max: 100, trim: true },
  AccelerationRating: { type: Number, max: 100, trim: true },
  OriginalKickAccuracyRating: { type: Number, max: 100, trim: true },
  OriginalKickPowerRating: { type: Number, max: 100, trim: true },
  BreakSackRating: { type: Number, max: 100, trim: true },
  BlockSheddingRating: { type: Number, max: 100, trim: true },
  BCVisionRating: { type: Number, max: 100, trim: true },
  AwarenessRating: { type: Number, max: 100, trim: true },
  CatchInTrafficRating: { type: Number, max: 100, trim: true },
  CatchingRating: { type: Number, max: 100, trim: true },
  CarryingRating: { type: Number, max: 100, trim: true },
  BreakTackleRating: { type: Number, max: 100, trim: true },
  DeepRouteRunningRating: { type: Number, max: 100, trim: true },
  ConfidenceRating: { type: Number, max: 100, trim: true },
  ChangeOfDirectionRating: { type: Number, max: 100, trim: true },
  ImpactBlockingRating: { type: Number, max: 100, trim: true },
  HitPowerRating: { type: Number, max: 100, trim: true },
  FinesseMovesRating: { type: Number, max: 100, trim: true },
  JukeMoveRating: { type: Number, max: 100, trim: true },
  InjuryRating: { type: Number, max: 100, trim: true },
  KickReturnRating: { type: Number, max: 100, trim: true },
  KickPowerRating: { type: Number, max: 100, trim: true },
  KickAccuracyRating: { type: Number, max: 100, trim: true },
  JumpingRating: { type: Number, max: 100, trim: true },
  MediumRouteRunningRating: { type: Number, max: 100, trim: true },
  ManCoverageRating: { type: Number, max: 100, trim: true },
  LongSnapRating: { type: Number, max: 100, trim: true },
  LeadBlockRating: { type: Number, max: 100, trim: true },
  PressRating: { type: Number, max: 100, trim: true },
  PowerMovesRating: { type: Number, max: 100, trim: true },
  RunBlockPowerRating: { type: Number, max: 100, trim: true },
  RunBlockFinesseRating: { type: Number, max: 100, trim: true },
  ReleaseRating: { type: Number, max: 100, trim: true },
  PursuitRating: { type: Number, max: 100, trim: true },
  SpeedRating: { type: Number, max: 100, trim: true },
  SpectacularCatchRating: { type: Number, max: 100, trim: true },
  ShortRouteRunningRating: { type: Number, max: 100, trim: true },
  RunBlockRating: { type: Number, max: 100, trim: true },
  StrengthRating: { type: Number, max: 100, trim: true },
  StiffArmRating: { type: Number, max: 100, trim: true },
  StaminaRating: { type: Number, max: 100, trim: true },
  SpinMoveRating: { type: Number, max: 100, trim: true },
  ThrowAccuracyRating: { type: Number, max: 100, trim: true },
  ThrowAccuracyMidRating: { type: Number, max: 100, trim: true },
  ThrowAccuracyDeepRating: { type: Number, max: 100, trim: true },
  TackleRating: { type: Number, max: 100, trim: true },
  ThrowUnderPressureRating: { type: Number, max: 100, trim: true },
  ThrowPowerRating: { type: Number, max: 100, trim: true },
  ThrowOnTheRunRating: { type: Number, max: 100, trim: true },
  ThrowAccuracyShortRating: { type: Number, max: 100, trim: true },
  ZoneCoverageRating: { type: Number, max: 100, trim: true },
  TruckingRating: { type: Number, max: 100, trim: true },
  ToughnessRating: { type: Number, max: 100, trim: true },
  PlayActionRating: { type: Number, max: 100, trim: true },
  PassBlockFinesseRating: { type: Number, max: 100, trim: true },
  PassBlockPowerRating: { type: Number, max: 100, trim: true },
  PassBlockRating: { type: Number, max: 100, trim: true },
  Player: { type: String, trim: true },
  IsVisible: { type: String, trim: true },
  ProDayThreeConeDrill: { type: Number, trim: true },
  ProDayTwentyYardShuttle: { type: Number, trim: true },
  ProDayVerticalJump: { type: Number, trim: true },
  CombineTwentyYardShuttle: { type: Number, trim: true },
  CombineVerticalJump: { type: Number, trim: true },
  ProDayFortyYardDash: { type: Number, trim: true },
  CombineFortyYardDash: { type: Number, trim: true },
  CombineOverallGrade: { type: Number, trim: true },
  CombineThreeConeDrill: { type: Number, trim: true },
  ProDayBroadJump: { type: Number, trim: true },
  InitialDraftRank: { type: Number, trim: true },
  TrueOverallRanking: { type: Number, trim: true },
  CombineBenchPress: { type: Number, trim: true },
  ProDayBenchPress: { type: Number, trim: true },
  ProductionGrade: { type: Number, trim: true },
  CombineBroadJump: { type: Number, trim: true },
  season: {
    type: mongoose.Schema.ObjectId,
    ref: "Season",
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  franchise: {
    type: mongoose.Schema.ObjectId,
    ref: 'Franchise',
    required: true
  },
  info: {
    type: mongoose.Schema.ObjectId,
    ref: 'Info',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Static method to get avgerages
PlayerSchema.statics.getSeasonAverages = async function(seasonId) {

  const obj = await this.aggregate([
    {
      $match: { season: seasonId }
    },
    {
      $group: {
        _id: '$season',
        averageOverall: { $avg: '$OverallRating' }
      }
    }
  ])

  try {
    await this.model('Season').findByIdAndUpdate(seasonId, {
      averageOverall: Math.round(obj[0].averageOverall * 100) / 100
    })
  } catch (err) {
    console.log(err)
  }
  console.log(obj)
}

// Call getSeasonAverages after save
PlayerSchema.post('save', async function() {
  await this.constructor.getSeasonAverages(this.season)
})

// Call getSeasonAverages after remove
PlayerSchema.post('remove', async function() {
  await this.constructor.getSeasonAverages(this.season)
})

module.exports = mongoose.model("Player", PlayerSchema);
