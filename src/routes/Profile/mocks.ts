import { BadgeVariant } from '@graphql';

type ClaimedBadge = {
  variant: BadgeVariant;
};

export const claimedBadges: ClaimedBadge[] = [
  {
    variant: 'degenStuff',
  },
  {
    variant: 'deltaDegen',
  },
  {
    variant: 'dryIce',
  },
  {
    variant: 'irsConnoisseur',
  },
  {
    variant: 'leverageCrowbar',
  },
  {
    variant: 'noRiskHereSer',
  },
  {
    variant: 'sushiRoll',
  },
  {
    variant: 'seasonedTrader',
  },
  {
    variant: 'beWaterMyFriend',
  },
  {
    variant: 'rainMaker',
  },
  {
    variant: 'waterHose',
  },
  {
    variant: 'moneyMoneyMoney',
  },
  {
    variant: 'lpoor',
  },
  {
    variant: 'sugarDaddy',
  },
  {
    variant: 'maxBidding',
  },
  {
    variant: 'okBoomer',
  },
];

type CollectionBadge = {
  variant: BadgeVariant;
  achievedAt?: number;
};

export const collectionBadges: CollectionBadge[] = [
  {
    variant: 'noRiskHereSer',
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
    variant: 'seasonedTrader',
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
    variant: 'sugarDaddy',
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
