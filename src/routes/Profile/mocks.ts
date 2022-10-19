import { BadgeVariant } from './types';

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
    achievedAt: 1665525600000,
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
    achievedAt: 1665525600000,
  },
  {
    variant: 'okBoomer',
    achievedAt: 1665525600000,
  },
  {
    variant: 'maxBidding',
    achievedAt: 1665525600000,
  },
  {
    variant: 'sugarDaddy',
    achievedAt: 1665525600000,
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
