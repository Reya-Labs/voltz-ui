import { BadgeVariant } from '@graphql';

type CollectionBadge = {
  variant: BadgeVariant;
  achievedAt?: number;
};

export const season1Badges: CollectionBadge[] = [
  {
    variant: 'fixedTrader',
    achievedAt: new Date('02/02/2022').valueOf(),
  },
  {
    variant: 'deltaDegen',
  },
  {
    variant: 'leverageCrowbar',
  },
  {
    variant: 'irsConnoisseur',
  },
  {
    variant: 'sushiRoll',
  },
  {
    variant: 'degenStuff',
  },
  {
    variant: 'topTrader',
    achievedAt: new Date('02/02/2022').valueOf(),
  },
  {
    variant: 'okBoomer',
    achievedAt: new Date('02/02/2022').valueOf(),
  },
  {
    variant: 'maxBidding',
    achievedAt: new Date('02/02/2022').valueOf(),
  },
  {
    variant: 'yikes',
    achievedAt: new Date('02/02/2022').valueOf(),
  },
  {
    variant: 'lpoor',
  },
  {
    variant: 'moneyMoneyMoney',
  },
  {
    variant: 'waterHose',
  },
  {
    variant: 'rainMaker',
  },
  {
    variant: 'beWaterMyFriend',
  },
  {
    variant: 'dryIce',
  },
];
export const seasonOGBadges: CollectionBadge[] = [
  {
    variant: 'ogFixedTrader',
    achievedAt: new Date().valueOf(),
  },
  {
    variant: 'ogDeltaDegen',
    achievedAt: new Date().valueOf(),
  },
  {
    variant: 'ogLeverageCrowbar',
    achievedAt: new Date().valueOf(),
  },
  {
    variant: 'ogIrsConnoisseur',
    achievedAt: new Date().valueOf(),
  },
  {
    variant: 'ogSushiRoll',
    achievedAt: new Date().valueOf(),
  },
  {
    variant: 'ogDegenStuff',
    achievedAt: new Date().valueOf(),
  },
  {
    variant: 'ogTopTrader',
    achievedAt: new Date().valueOf(),
  },
  {
    variant: 'ogOkBoomer',
    achievedAt: new Date().valueOf(),
  },
  {
    variant: 'ogMaxBidding',
    achievedAt: new Date().valueOf(),
  },
  {
    variant: 'ogYikes',
    achievedAt: new Date().valueOf(),
  },
  {
    variant: 'ogLpoor',
    achievedAt: new Date().valueOf(),
  },
  {
    variant: 'ogMoneyMoneyMoney',
    achievedAt: new Date().valueOf(),
  },
  {
    variant: 'ogWaterHose',
    achievedAt: new Date().valueOf(),
  },
  {
    variant: 'ogRainMaker',
    achievedAt: new Date().valueOf(),
  },
  {
    variant: 'ogBeWaterMyFriend',
    achievedAt: new Date().valueOf(),
  },
  {
    variant: 'ogDryIce',
    achievedAt: new Date().valueOf(),
  },
];
