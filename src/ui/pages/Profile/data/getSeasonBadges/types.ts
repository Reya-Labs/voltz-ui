import { BadgeResponse } from '@voltz-protocol/v1-sdk';

export type GetProfileBadgesResponse = {
  badgeResponseRaw?: BadgeResponse;
  variant: BadgeVariant;
  achievedAt?: number;
  claimedAt?: number;
}[];

export type ProgrammaticBadges =
  // season 1
  | 'degenStuff'
  | 'deltaDegen'
  | 'irsConnoisseur'
  | 'leverageCrowbar'
  | 'fixedTrader'
  | 'sushiRoll'
  | 'topTrader'
  | 'beWaterMyFriend'
  | 'rainMaker'
  | 'waterHose'
  | 'moneyMoneyMoney'
  | 'lpoor'
  | 'yikes'
  | 'maxBidding'
  | 'okBoomer'
  | 'dryIce'
  | '0BCMellowLpVault'
  | 'mellowLpVault'
  | 'mellowLpVaultTier1'
  | 'mellowLpVaultTier2'
  | 'mellowLpVaultTier3'
  // season OG
  | 'ogDegenStuff'
  | 'ogDeltaDegen'
  | 'ogIrsConnoisseur'
  | 'ogLeverageCrowbar'
  | 'ogFixedTrader'
  | 'ogSushiRoll'
  | 'ogTopTrader'
  | 'ogBeWaterMyFriend'
  | 'ogRainMaker'
  | 'ogWaterHose'
  | 'ogMoneyMoneyMoney'
  | 'ogLpoor'
  | 'ogYikes'
  | 'ogMaxBidding'
  | 'ogOkBoomer'
  | 'ogDryIce'
  // season 2
  | 's2DegenStuff'
  | 's2DeltaDegen'
  | 's2IrsConnoisseur'
  | 's2LeverageCrowbar'
  | 's2FixedTrader'
  | 's2SushiRoll'
  | 's2TopTrader'
  | 's2BeWaterMyFriend'
  | 's2RainMaker'
  | 's2WaterHose'
  | 's2MoneyMoneyMoney'
  | 's2Lpoor'
  | 's2Yikes'
  | 's2MaxBidding'
  | 's2MellowLpVaultTier1'
  | 's2MellowLpVaultTier2'
  | 's2MellowLpVaultTier3'
  // season 3
  | 's3DegenStuff'
  | 's3DeltaDegen'
  | 's3IrsConnoisseur'
  | 's3LeverageCrowbar'
  | 's3FixedTrader'
  | 's3SushiRoll'
  | 's3TopTrader'
  | 's3BeWaterMyFriend'
  | 's3RainMaker'
  | 's3WaterHose'
  | 's3MoneyMoneyMoney'
  | 's3Lpoor'
  | 's3Yikes'
  | 's3MaxBidding'
  | 's3MellowLpVaultTier1'
  | 's3MellowLpVaultTier2'
  | 's3MellowLpVaultTier3'
  // season 3 arbitrum
  | 's3DegenStuffArbitrum'
  | 's3DeltaDegenArbitrum'
  | 's3IrsConnoisseurArbitrum'
  | 's3LeverageCrowbarArbitrum'
  | 's3FixedTraderArbitrum'
  | 's3SushiRollArbitrum'
  | 's3TopTraderArbitrum'
  | 's3BeWaterMyFriendArbitrum'
  | 's3RainMakerArbitrum'
  | 's3WaterHoseArbitrum'
  | 's3MoneyMoneyMoneyArbitrum'
  | 's3LpoorArbitrum'
  | 's3YikesArbitrum'
  | 's3MaxBiddingArbitrum'
  | 's3MellowLpVaultTier1Arbitrum'
  | 's3MellowLpVaultTier2Arbitrum'
  | 's3MellowLpVaultTier3Arbitrum'
  // season 4
  | 's4DegenStuff'
  | 's4DeltaDegen'
  | 's4IrsConnoisseur'
  | 's4LeverageCrowbar'
  | 's4FixedTrader'
  | 's4SushiRoll'
  | 's4TopTrader'
  | 's4BeWaterMyFriend'
  | 's4RainMaker'
  | 's4WaterHose'
  | 's4MoneyMoneyMoney'
  | 's4Lpoor'
  | 's4Yikes'
  | 's4MaxBidding'
  | 's4MellowLpVaultTier1'
  | 's4MellowLpVaultTier2'
  | 's4MellowLpVaultTier3'
  // season 4 arbitrum
  | 's4DegenStuffArbitrum'
  | 's4DeltaDegenArbitrum'
  | 's4IrsConnoisseurArbitrum'
  | 's4LeverageCrowbarArbitrum'
  | 's4FixedTraderArbitrum'
  | 's4SushiRollArbitrum'
  | 's4TopTraderArbitrum'
  | 's4BeWaterMyFriendArbitrum'
  | 's4RainMakerArbitrum'
  | 's4WaterHoseArbitrum'
  | 's4MoneyMoneyMoneyArbitrum'
  | 's4LpoorArbitrum'
  | 's4YikesArbitrum'
  | 's4MaxBiddingArbitrum'
  | 's4MellowLpVaultTier1Arbitrum'
  | 's4MellowLpVaultTier2Arbitrum'
  | 's4MellowLpVaultTier3Arbitrum';

export type NonProgrammaticBadges =
  | 'governorz'
  | 'diplomatz'
  | 'senatorz'
  | 'whaleWhisperer'
  | 'notionalInfluencer'
  | 'referror'
  | 's4VoltzAave'
  | 's4VoltzGlp'
  | 's4UK'
  | 's4Tatsu';

export type BadgeVariant = ProgrammaticBadges | NonProgrammaticBadges;
