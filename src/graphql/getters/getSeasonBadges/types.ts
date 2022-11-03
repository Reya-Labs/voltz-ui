export type GetProfileBadgesResponse = {
  variant: BadgeVariant;
  achievedAt?: number;
  claimedAt?: number;
}[];

export type BadgeResponse = {
  id: string;
  badgeType: string;
  badgeName: string;
  awardedTimestamp: string;
  mintedTimestamp: string;
};

export type BadgesQueryResponse = {
  seasonUser: {
    id: string;
    badges: BadgeResponse[];
  };
};

export type BadgeVariant =
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
