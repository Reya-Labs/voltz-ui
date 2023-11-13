import React from 'react';

import {
  _0BCMellowLpVault,
  AlphaPass,
  BeWaterMyFriend,
  DegenStuff,
  DeltaDegen,
  Diplomatz,
  DryIce,
  FixedTrader,
  GasIcon,
  Governorz,
  IrsConnoisseur,
  LeverageCrowbar,
  Lpoor,
  MaxBidding,
  MellowLpVault,
  MellowLpVaultTier1,
  MellowLpVaultTier2,
  MellowLpVaultTier3,
  MoneyMoneyMoney,
  NoClaimedBadges,
  NotionalInfluencer,
  OGBeWaterMyFriend,
  OGDegenStuff,
  OGDeltaDegen,
  OGDryIce,
  OGFixedTrader,
  OGIrsConnoisseur,
  OGLeverageCrowbar,
  OGLpoor,
  OGMaxBidding,
  OGMoneyMoneyMoney,
  OGOkBoomer,
  OGRainmaker,
  OGSushiRoll,
  OGTopTrader,
  OGWaterHose,
  OGYikes,
  OkBoomer,
  Rainmaker,
  Referror,
  S2BeWaterMyFriend,
  S2DegenStuff,
  S2DeltaDegen,
  S2FixedTrader,
  S2IrsConnoisseur,
  S2LeverageCrowbar,
  S2Lpoor,
  S2MaxBidding,
  S2MellowLpVaultTier1,
  S2MellowLpVaultTier2,
  S2MellowLpVaultTier3,
  S2MoneyMoneyMoney,
  S2Rainmaker,
  S2SushiRoll,
  S2TopTrader,
  S2WaterHose,
  S2Yikes,
  S3BeWaterMyFriend,
  S3BeWaterMyFriendArbitrum,
  S3DegenStuff,
  S3DegenStuffArbitrum,
  S3DeltaDegen,
  S3DeltaDegenArbitrum,
  S3FixedTrader,
  S3FixedTraderArbitrum,
  S3IrsConnoisseur,
  S3IrsConnoisseurArbitrum,
  S3LeverageCrowbar,
  S3LeverageCrowbarArbitrum,
  S3Lpoor,
  S3LpoorArbitrum,
  S3MaxBidding,
  S3MaxBiddingArbitrum,
  S3MoneyMoneyMoney,
  S3MoneyMoneyMoneyArbitrum,
  S3Rainmaker,
  S3RainmakerArbitrum,
  S3SushiRoll,
  S3SushiRollArbitrum,
  S3TopTrader,
  S3TopTraderArbitrum,
  S3WaterHose,
  S3WaterHoseArbitrum,
  S3Yikes,
  S3YikesArbitrum,
  S4BeWaterMyFriend,
  S4BeWaterMyFriendArbitrum,
  S4DegenStuff,
  S4DegenStuffArbitrum,
  S4DeltaDegen,
  S4DeltaDegenArbitrum,
  S4FixedTrader,
  S4FixedTraderArbitrum,
  S4IrsConnoisseur,
  S4IrsConnoisseurArbitrum,
  S4LeverageCrowbar,
  S4LeverageCrowbarArbitrum,
  S4Lpoor,
  S4LpoorArbitrum,
  S4MaxBidding,
  S4MaxBiddingArbitrum,
  S4MoneyMoneyMoney,
  S4MoneyMoneyMoneyArbitrum,
  S4Rainmaker,
  S4RainmakerArbitrum,
  S4SushiRoll,
  S4SushiRollArbitrum,
  S4Tatsu,
  S4TopTrader,
  S4TopTraderArbitrum,
  S4UK,
  S4VoltzAave,
  S4VoltzGlp,
  S4WaterHose,
  S4WaterHoseArbitrum,
  S4Yikes,
  S4YikesArbitrum,
  Senatorz,
  SushiRoll,
  TopTrader,
  VoyageWeek1,
  VoyageWeek2,
  VoyageWeek3,
  VoyageWeek4,
  WaterHose,
  WhaleWhisperer,
  Yikes,
} from './icons';

export type SupportedIcons =
  | 'alpha-pass'
  // badges
  | 'noClaimedBadges'
  // season 1 badges
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
  | 'dryIce'
  | 'okBoomer'
  | 'mellowLpVault'
  | 'mellowLpVaultTier1'
  | 'mellowLpVaultTier2'
  | 'mellowLpVaultTier3'
  | '0BCMellowLpVault'
  // season OG badges
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
  | 'ogDryIce'
  | 'ogOkBoomer'
  // season1, season2, season3 & og non-programmatic badges
  | 'senatorz'
  | 'governorz'
  | 'diplomatz'
  | 'whaleWhisperer'
  | 'notionalInfluencer'
  | 'referror'
  // season 2 badges
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
  // season 3 badges
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
  // season 3 badges - arbitrum
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
  // season 4 badges
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
  // season 4 badges - arbitrum
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
  | 's4MellowLpVaultTier3Arbitrum'
  | 's4Tatsu'
  | 's4UK'
  | 's4VoltzGlp'
  | 's4VoltzAave'
  // voyage
  | 'voyageWeek1'
  | 'voyageWeek2'
  | 'voyageWeek3'
  | 'voyageWeek4'
  // icons
  | 'gasIcon';

export const iconMap: Record<
  SupportedIcons,
  React.FunctionComponent<
    React.PropsWithChildren<{
      className?: string;
    }>
  >
> = {
  'alpha-pass': AlphaPass,
  // badges
  noClaimedBadges: NoClaimedBadges,
  // badges season 1
  degenStuff: DegenStuff,
  deltaDegen: DeltaDegen,
  irsConnoisseur: IrsConnoisseur,
  leverageCrowbar: LeverageCrowbar,
  fixedTrader: FixedTrader,
  sushiRoll: SushiRoll,
  topTrader: TopTrader,
  beWaterMyFriend: BeWaterMyFriend,
  rainMaker: Rainmaker,
  waterHose: WaterHose,
  moneyMoneyMoney: MoneyMoneyMoney,
  lpoor: Lpoor,
  yikes: Yikes,
  maxBidding: MaxBidding,
  okBoomer: OkBoomer,
  dryIce: DryIce,
  mellowLpVault: MellowLpVault,
  mellowLpVaultTier1: MellowLpVaultTier1,
  mellowLpVaultTier2: MellowLpVaultTier2,
  mellowLpVaultTier3: MellowLpVaultTier3,
  '0BCMellowLpVault': _0BCMellowLpVault,

  // badges season OG
  ogDegenStuff: OGDegenStuff,
  ogDeltaDegen: OGDeltaDegen,
  ogIrsConnoisseur: OGIrsConnoisseur,
  ogLeverageCrowbar: OGLeverageCrowbar,
  ogFixedTrader: OGFixedTrader,
  ogSushiRoll: OGSushiRoll,
  ogTopTrader: OGTopTrader,
  ogBeWaterMyFriend: OGBeWaterMyFriend,
  ogRainMaker: OGRainmaker,
  ogWaterHose: OGWaterHose,
  ogMoneyMoneyMoney: OGMoneyMoneyMoney,
  ogLpoor: OGLpoor,
  ogYikes: OGYikes,
  ogMaxBidding: OGMaxBidding,
  ogOkBoomer: OGOkBoomer,
  ogDryIce: OGDryIce,
  // season1, season2, season3 & og non-programmatic badges
  senatorz: Senatorz,
  diplomatz: Diplomatz,
  governorz: Governorz,
  notionalInfluencer: NotionalInfluencer,
  referror: Referror,
  whaleWhisperer: WhaleWhisperer,
  // season2 badges
  s2DegenStuff: S2DegenStuff,
  s2DeltaDegen: S2DeltaDegen,
  s2IrsConnoisseur: S2IrsConnoisseur,
  s2LeverageCrowbar: S2LeverageCrowbar,
  s2FixedTrader: S2FixedTrader,
  s2SushiRoll: S2SushiRoll,
  s2TopTrader: S2TopTrader,
  s2BeWaterMyFriend: S2BeWaterMyFriend,
  s2RainMaker: S2Rainmaker,
  s2WaterHose: S2WaterHose,
  s2MoneyMoneyMoney: S2MoneyMoneyMoney,
  s2Lpoor: S2Lpoor,
  s2Yikes: S2Yikes,
  s2MaxBidding: S2MaxBidding,
  s2MellowLpVaultTier1: S2MellowLpVaultTier1,
  s2MellowLpVaultTier2: S2MellowLpVaultTier2,
  s2MellowLpVaultTier3: S2MellowLpVaultTier3,
  // season3 badges
  s3DegenStuff: S3DegenStuff,
  s3DeltaDegen: S3DeltaDegen,
  s3IrsConnoisseur: S3IrsConnoisseur,
  s3LeverageCrowbar: S3LeverageCrowbar,
  s3FixedTrader: S3FixedTrader,
  s3SushiRoll: S3SushiRoll,
  s3TopTrader: S3TopTrader,
  s3BeWaterMyFriend: S3BeWaterMyFriend,
  s3RainMaker: S3Rainmaker,
  s3WaterHose: S3WaterHose,
  s3MoneyMoneyMoney: S3MoneyMoneyMoney,
  s3Lpoor: S3Lpoor,
  s3Yikes: S3Yikes,
  s3MaxBidding: S3MaxBidding,
  s3MellowLpVaultTier1: S2MellowLpVaultTier1,
  s3MellowLpVaultTier2: S2MellowLpVaultTier2,
  s3MellowLpVaultTier3: S2MellowLpVaultTier3,
  // season 3 badges - arbitrum
  s3DegenStuffArbitrum: S3DegenStuffArbitrum,
  s3DeltaDegenArbitrum: S3DeltaDegenArbitrum,
  s3IrsConnoisseurArbitrum: S3IrsConnoisseurArbitrum,
  s3LeverageCrowbarArbitrum: S3LeverageCrowbarArbitrum,
  s3FixedTraderArbitrum: S3FixedTraderArbitrum,
  s3SushiRollArbitrum: S3SushiRollArbitrum,
  s3TopTraderArbitrum: S3TopTraderArbitrum,
  s3BeWaterMyFriendArbitrum: S3BeWaterMyFriendArbitrum,
  s3RainMakerArbitrum: S3RainmakerArbitrum,
  s3WaterHoseArbitrum: S3WaterHoseArbitrum,
  s3MoneyMoneyMoneyArbitrum: S3MoneyMoneyMoneyArbitrum,
  s3LpoorArbitrum: S3LpoorArbitrum,
  s3YikesArbitrum: S3YikesArbitrum,
  s3MaxBiddingArbitrum: S3MaxBiddingArbitrum,
  s3MellowLpVaultTier1Arbitrum: S2MellowLpVaultTier1,
  s3MellowLpVaultTier2Arbitrum: S2MellowLpVaultTier2,
  s3MellowLpVaultTier3Arbitrum: S2MellowLpVaultTier3,
  // season4 badges
  s4DegenStuff: S4DegenStuff,
  s4DeltaDegen: S4DeltaDegen,
  s4IrsConnoisseur: S4IrsConnoisseur,
  s4LeverageCrowbar: S4LeverageCrowbar,
  s4FixedTrader: S4FixedTrader,
  s4SushiRoll: S4SushiRoll,
  s4Tatsu: S4Tatsu,
  s4UK: S4UK,
  s4VoltzGlp: S4VoltzGlp,
  s4VoltzAave: S4VoltzAave,
  s4TopTrader: S4TopTrader,
  s4BeWaterMyFriend: S4BeWaterMyFriend,
  s4RainMaker: S4Rainmaker,
  s4WaterHose: S4WaterHose,
  s4MoneyMoneyMoney: S4MoneyMoneyMoney,
  s4Lpoor: S4Lpoor,
  s4Yikes: S4Yikes,
  s4MaxBidding: S4MaxBidding,
  s4MellowLpVaultTier1: S2MellowLpVaultTier1,
  s4MellowLpVaultTier2: S2MellowLpVaultTier2,
  s4MellowLpVaultTier3: S2MellowLpVaultTier3,
  // season 4 badges - arbitrum
  s4DegenStuffArbitrum: S4DegenStuffArbitrum,
  s4DeltaDegenArbitrum: S4DeltaDegenArbitrum,
  s4IrsConnoisseurArbitrum: S4IrsConnoisseurArbitrum,
  s4LeverageCrowbarArbitrum: S4LeverageCrowbarArbitrum,
  s4FixedTraderArbitrum: S4FixedTraderArbitrum,
  s4SushiRollArbitrum: S4SushiRollArbitrum,
  s4TopTraderArbitrum: S4TopTraderArbitrum,
  s4BeWaterMyFriendArbitrum: S4BeWaterMyFriendArbitrum,
  s4RainMakerArbitrum: S4RainmakerArbitrum,
  s4WaterHoseArbitrum: S4WaterHoseArbitrum,
  s4MoneyMoneyMoneyArbitrum: S4MoneyMoneyMoneyArbitrum,
  s4LpoorArbitrum: S4LpoorArbitrum,
  s4YikesArbitrum: S4YikesArbitrum,
  s4MaxBiddingArbitrum: S4MaxBiddingArbitrum,
  s4MellowLpVaultTier1Arbitrum: S2MellowLpVaultTier1,
  s4MellowLpVaultTier2Arbitrum: S2MellowLpVaultTier2,
  s4MellowLpVaultTier3Arbitrum: S2MellowLpVaultTier3,
  // Voyage
  voyageWeek1: VoyageWeek1,
  voyageWeek2: VoyageWeek2,
  voyageWeek3: VoyageWeek3,
  voyageWeek4: VoyageWeek4,

  // icons
  gasIcon: GasIcon,
};
