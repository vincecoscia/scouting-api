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
  OverallRating: { type: Number, trim: true },
  TraitDevelopment: { type: String, trim: true },
  ContractStatus: { type: String, trim: true },
  Motivation3: { type: String, trim: true },
  Motivation2: { type: String, trim: true },
  Motivation1: { type: String, trim: true },
  OriginalHitPowerRating: { type: Number, trim: true },
  OriginalJumpingRating: { type: Number, trim: true },
  AgilityRating: { type: Number, trim: true },
  AccelerationRating: { type: Number, trim: true },
  OriginalKickAccuracyRating: { type: Number, trim: true },
  OriginalKickPowerRating: { type: Number, trim: true },
  BreakSackRating: { type: Number, trim: true },
  BlockSheddingRating: { type: Number, trim: true },
  BCVisionRating: { type: Number, trim: true },
  AwarenessRating: { type: Number, trim: true },
  CatchInTrafficRating: { type: Number, trim: true },
  CatchingRating: { type: Number, trim: true },
  CarryingRating: { type: Number, trim: true },
  BreakTackleRating: { type: Number, trim: true },
  DeepRouteRunningRating: { type: Number, trim: true },
  ConfidenceRating: { type: Number, trim: true },
  ChangeOfDirectionRating: { type: Number, trim: true },
  ImpactBlockingRating: { type: Number, trim: true },
  HitPowerRating: { type: Number, trim: true },
  FinesseMovesRating: { type: Number, trim: true },
  JukeMoveRating: { type: Number, trim: true },
  InjuryRating: { type: Number, trim: true },
  KickReturnRating: { type: Number, trim: true },
  KickPowerRating: { type: Number, trim: true },
  KickAccuracyRating: { type: Number, trim: true },
  JumpingRating: { type: Number, trim: true },
  MediumRouteRunningRating: { type: Number, trim: true },
  ManCoverageRating: { type: Number, trim: true },
  LongSnapRating: { type: Number, trim: true },
  LeadBlockRating: { type: Number, trim: true },
  PressRating: { type: Number, trim: true },
  PowerMovesRating: { type: Number, trim: true },
  RunBlockPowerRating: { type: Number, trim: true },
  RunBlockFinesseRating: { type: Number, trim: true },
  ReleaseRating: { type: Number, trim: true },
  PursuitRating: { type: Number, trim: true },
  SpeedRating: { type: Number, trim: true },
  SpectacularCatchRating: { type: Number, trim: true },
  ShortRouteRunningRating: { type: Number, trim: true },
  RunBlockRating: { type: Number, trim: true },
  StrengthRating: { type: Number, trim: true },
  StiffArmRating: { type: Number, trim: true },
  StaminaRating: { type: Number, trim: true },
  SpinMoveRating: { type: Number, trim: true },
  ThrowAccuracyRating: { type: Number, trim: true },
  ThrowAccuracyMidRating: { type: Number, trim: true },
  ThrowAccuracyDeepRating: { type: Number, trim: true },
  TackleRating: { type: Number, trim: true },
  ThrowUnderPressureRating: { type: Number, trim: true },
  ThrowPowerRating: { type: Number, trim: true },
  ThrowOnTheRunRating: { type: Number, trim: true },
  ThrowAccuracyShortRating: { type: Number, trim: true },
  ZoneCoverageRating: { type: Number, trim: true },
  TruckingRating: { type: Number, trim: true },
  ToughnessRating: { type: Number, trim: true },
  PlayActionRating: { type: Number, trim: true },
  PassBlockFinesseRating: { type: Number, trim: true },
  PassBlockPowerRating: { type: Number, trim: true },
  PassBlockRating: { type: Number, trim: true },
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
