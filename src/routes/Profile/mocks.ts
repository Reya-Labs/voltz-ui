import { BadgeVariant } from './types';

type ClaimedBadge = {
  variant: BadgeVariant;
};

export const claimedBadges: ClaimedBadge[] = [
  {
    variant: 'noRiskHereSer',
  },
  {
    variant: 'leverageCrowbar',
  },
  {
    variant: 'deltaDegen',
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
];

type CollectionBadge = {
  variant: BadgeVariant;
  achievedAt?: string;
};

export const collectionBadges: CollectionBadge[] = [
  {
    variant: 'noRiskHereSer',
    achievedAt: '10/12/22',
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
    achievedAt: '10/12/22',
  },
  {
    variant: 'okBoomer',
    achievedAt: '10/12/22',
  },
  {
    variant: 'maxBidding',
    achievedAt: '10/12/22',
  },
  {
    variant: 'sugarDaddy',
    achievedAt: '10/12/22',
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
];
