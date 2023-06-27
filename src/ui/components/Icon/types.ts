import { ElementType } from 'react';

import {
  _0BCMellowLpVault,
  AlphaPass,
  BeWaterMyFriend,
  DegenStuff,
  DeltaDegen,
  Diplomatz,
  DryIce,
  FixedTrader,
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
  S3MellowLpVaultTier1,
  S3MellowLpVaultTier1Arbitrum,
  S3MellowLpVaultTier2,
  S3MellowLpVaultTier2Arbitrum,
  S3MellowLpVaultTier3,
  S3MellowLpVaultTier3Arbitrum,
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
  S4MellowLpVaultTier1,
  S4MellowLpVaultTier1Arbitrum,
  S4MellowLpVaultTier2,
  S4MellowLpVaultTier2Arbitrum,
  S4MellowLpVaultTier3,
  S4MellowLpVaultTier3Arbitrum,
  S4MoneyMoneyMoney,
  S4MoneyMoneyMoneyArbitrum,
  S4Rainmaker,
  S4RainmakerArbitrum,
  S4SushiRoll,
  S4SushiRollArbitrum,
  S4TopTrader,
  S4TopTraderArbitrum,
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
  // voyage
  | 'voyageWeek1'
  | 'voyageWeek2'
  | 'voyageWeek3'
  | 'voyageWeek4';

export const iconMap: Record<SupportedIcons, ElementType> = {
  'alpha-pass': AlphaPass as ElementType,
  // badges
  noClaimedBadges: NoClaimedBadges as ElementType,
  // badges season 1
  degenStuff: DegenStuff as ElementType,
  deltaDegen: DeltaDegen as ElementType,
  irsConnoisseur: IrsConnoisseur as ElementType,
  leverageCrowbar: LeverageCrowbar as ElementType,
  fixedTrader: FixedTrader as ElementType,
  sushiRoll: SushiRoll as ElementType,
  topTrader: TopTrader as ElementType,
  beWaterMyFriend: BeWaterMyFriend as ElementType,
  rainMaker: Rainmaker as ElementType,
  waterHose: WaterHose as ElementType,
  moneyMoneyMoney: MoneyMoneyMoney as ElementType,
  lpoor: Lpoor as ElementType,
  yikes: Yikes as ElementType,
  maxBidding: MaxBidding as ElementType,
  okBoomer: OkBoomer as ElementType,
  dryIce: DryIce as ElementType,
  mellowLpVault: MellowLpVault as ElementType,
  mellowLpVaultTier1: MellowLpVaultTier1 as ElementType,
  mellowLpVaultTier2: MellowLpVaultTier2 as ElementType,
  mellowLpVaultTier3: MellowLpVaultTier3 as ElementType,
  '0BCMellowLpVault': _0BCMellowLpVault as ElementType,

  // badges season OG
  ogDegenStuff: OGDegenStuff as ElementType,
  ogDeltaDegen: OGDeltaDegen as ElementType,
  ogIrsConnoisseur: OGIrsConnoisseur as ElementType,
  ogLeverageCrowbar: OGLeverageCrowbar as ElementType,
  ogFixedTrader: OGFixedTrader as ElementType,
  ogSushiRoll: OGSushiRoll as ElementType,
  ogTopTrader: OGTopTrader as ElementType,
  ogBeWaterMyFriend: OGBeWaterMyFriend as ElementType,
  ogRainMaker: OGRainmaker as ElementType,
  ogWaterHose: OGWaterHose as ElementType,
  ogMoneyMoneyMoney: OGMoneyMoneyMoney as ElementType,
  ogLpoor: OGLpoor as ElementType,
  ogYikes: OGYikes as ElementType,
  ogMaxBidding: OGMaxBidding as ElementType,
  ogOkBoomer: OGOkBoomer as ElementType,
  ogDryIce: OGDryIce as ElementType,
  // season1, season2, season3 & og non-programmatic badges
  senatorz: Senatorz as ElementType,
  diplomatz: Diplomatz as ElementType,
  governorz: Governorz as ElementType,
  notionalInfluencer: NotionalInfluencer as ElementType,
  referror: Referror as ElementType,
  whaleWhisperer: WhaleWhisperer as ElementType,
  // season2 badges
  s2DegenStuff: S2DegenStuff as ElementType,
  s2DeltaDegen: S2DeltaDegen as ElementType,
  s2IrsConnoisseur: S2IrsConnoisseur as ElementType,
  s2LeverageCrowbar: S2LeverageCrowbar as ElementType,
  s2FixedTrader: S2FixedTrader as ElementType,
  s2SushiRoll: S2SushiRoll as ElementType,
  s2TopTrader: S2TopTrader as ElementType,
  s2BeWaterMyFriend: S2BeWaterMyFriend as ElementType,
  s2RainMaker: S2Rainmaker as ElementType,
  s2WaterHose: S2WaterHose as ElementType,
  s2MoneyMoneyMoney: S2MoneyMoneyMoney as ElementType,
  s2Lpoor: S2Lpoor as ElementType,
  s2Yikes: S2Yikes as ElementType,
  s2MaxBidding: S2MaxBidding as ElementType,
  s2MellowLpVaultTier1: S2MellowLpVaultTier1 as ElementType,
  s2MellowLpVaultTier2: S2MellowLpVaultTier2 as ElementType,
  s2MellowLpVaultTier3: S2MellowLpVaultTier3 as ElementType,
  // season3 badges
  s3DegenStuff: S3DegenStuff as ElementType,
  s3DeltaDegen: S3DeltaDegen as ElementType,
  s3IrsConnoisseur: S3IrsConnoisseur as ElementType,
  s3LeverageCrowbar: S3LeverageCrowbar as ElementType,
  s3FixedTrader: S3FixedTrader as ElementType,
  s3SushiRoll: S3SushiRoll as ElementType,
  s3TopTrader: S3TopTrader as ElementType,
  s3BeWaterMyFriend: S3BeWaterMyFriend as ElementType,
  s3RainMaker: S3Rainmaker as ElementType,
  s3WaterHose: S3WaterHose as ElementType,
  s3MoneyMoneyMoney: S3MoneyMoneyMoney as ElementType,
  s3Lpoor: S3Lpoor as ElementType,
  s3Yikes: S3Yikes as ElementType,
  s3MaxBidding: S3MaxBidding as ElementType,
  s3MellowLpVaultTier1: S3MellowLpVaultTier1 as ElementType,
  s3MellowLpVaultTier2: S3MellowLpVaultTier2 as ElementType,
  s3MellowLpVaultTier3: S3MellowLpVaultTier3 as ElementType,
  // season 3 badges - arbitrum
  s3DegenStuffArbitrum: S3DegenStuffArbitrum as ElementType,
  s3DeltaDegenArbitrum: S3DeltaDegenArbitrum as ElementType,
  s3IrsConnoisseurArbitrum: S3IrsConnoisseurArbitrum as ElementType,
  s3LeverageCrowbarArbitrum: S3LeverageCrowbarArbitrum as ElementType,
  s3FixedTraderArbitrum: S3FixedTraderArbitrum as ElementType,
  s3SushiRollArbitrum: S3SushiRollArbitrum as ElementType,
  s3TopTraderArbitrum: S3TopTraderArbitrum as ElementType,
  s3BeWaterMyFriendArbitrum: S3BeWaterMyFriendArbitrum as ElementType,
  s3RainMakerArbitrum: S3RainmakerArbitrum as ElementType,
  s3WaterHoseArbitrum: S3WaterHoseArbitrum as ElementType,
  s3MoneyMoneyMoneyArbitrum: S3MoneyMoneyMoneyArbitrum as ElementType,
  s3LpoorArbitrum: S3LpoorArbitrum as ElementType,
  s3YikesArbitrum: S3YikesArbitrum as ElementType,
  s3MaxBiddingArbitrum: S3MaxBiddingArbitrum as ElementType,
  s3MellowLpVaultTier1Arbitrum: S3MellowLpVaultTier1Arbitrum as ElementType,
  s3MellowLpVaultTier2Arbitrum: S3MellowLpVaultTier2Arbitrum as ElementType,
  s3MellowLpVaultTier3Arbitrum: S3MellowLpVaultTier3Arbitrum as ElementType,
  // season4 badges
  s4DegenStuff: S4DegenStuff as ElementType,
  s4DeltaDegen: S4DeltaDegen as ElementType,
  s4IrsConnoisseur: S4IrsConnoisseur as ElementType,
  s4LeverageCrowbar: S4LeverageCrowbar as ElementType,
  s4FixedTrader: S4FixedTrader as ElementType,
  s4SushiRoll: S4SushiRoll as ElementType,
  s4TopTrader: S4TopTrader as ElementType,
  s4BeWaterMyFriend: S4BeWaterMyFriend as ElementType,
  s4RainMaker: S4Rainmaker as ElementType,
  s4WaterHose: S4WaterHose as ElementType,
  s4MoneyMoneyMoney: S4MoneyMoneyMoney as ElementType,
  s4Lpoor: S4Lpoor as ElementType,
  s4Yikes: S4Yikes as ElementType,
  s4MaxBidding: S4MaxBidding as ElementType,
  s4MellowLpVaultTier1: S4MellowLpVaultTier1 as ElementType,
  s4MellowLpVaultTier2: S4MellowLpVaultTier2 as ElementType,
  s4MellowLpVaultTier3: S4MellowLpVaultTier3 as ElementType,
  // season 4 badges - arbitrum
  s4DegenStuffArbitrum: S4DegenStuffArbitrum as ElementType,
  s4DeltaDegenArbitrum: S4DeltaDegenArbitrum as ElementType,
  s4IrsConnoisseurArbitrum: S4IrsConnoisseurArbitrum as ElementType,
  s4LeverageCrowbarArbitrum: S4LeverageCrowbarArbitrum as ElementType,
  s4FixedTraderArbitrum: S4FixedTraderArbitrum as ElementType,
  s4SushiRollArbitrum: S4SushiRollArbitrum as ElementType,
  s4TopTraderArbitrum: S4TopTraderArbitrum as ElementType,
  s4BeWaterMyFriendArbitrum: S4BeWaterMyFriendArbitrum as ElementType,
  s4RainMakerArbitrum: S4RainmakerArbitrum as ElementType,
  s4WaterHoseArbitrum: S4WaterHoseArbitrum as ElementType,
  s4MoneyMoneyMoneyArbitrum: S4MoneyMoneyMoneyArbitrum as ElementType,
  s4LpoorArbitrum: S4LpoorArbitrum as ElementType,
  s4YikesArbitrum: S4YikesArbitrum as ElementType,
  s4MaxBiddingArbitrum: S4MaxBiddingArbitrum as ElementType,
  s4MellowLpVaultTier1Arbitrum: S4MellowLpVaultTier1Arbitrum as ElementType,
  s4MellowLpVaultTier2Arbitrum: S4MellowLpVaultTier2Arbitrum as ElementType,
  s4MellowLpVaultTier3Arbitrum: S4MellowLpVaultTier3Arbitrum as ElementType,
  // Voyage
  voyageWeek1: VoyageWeek1 as ElementType,
  voyageWeek2: VoyageWeek2 as ElementType,
  voyageWeek3: VoyageWeek3 as ElementType,
  voyageWeek4: VoyageWeek4 as ElementType,
};
