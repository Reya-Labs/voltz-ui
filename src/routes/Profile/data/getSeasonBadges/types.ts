import { BadgeResponse } from '@voltz-protocol/v1-sdk/dist/types/entities/communitySbt';

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
  | 'mellowLpVault'
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
  | 'ogDryIce';

export type NonProgrammaticBadges =
  | 'governorz'
  | 'diplomatz'
  | 'senatorz'
  | 'whaleWhisperer'
  | 'notionalInfluencer'
  | 'referror';

export type BadgeVariant = ProgrammaticBadges | NonProgrammaticBadges;
