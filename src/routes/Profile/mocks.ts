import { BadgeVariant } from '@graphql';

type CollectionBadge = {
  variant: BadgeVariant;
  achievedAt?: number;
};

export const collectionBadges: CollectionBadge[] = [
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
