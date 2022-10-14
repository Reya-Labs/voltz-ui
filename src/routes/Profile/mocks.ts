import { BadgeTier, BadgeVariant } from './types';

type ClaimedBadge = {
  variant: BadgeVariant;
  title: string;
  description: string;
  tier: BadgeTier;
};

export const claimedBadges: ClaimedBadge[] = [
  {
    title: 'NO RISK HERE SER',
    variant: 'noRiskHereSer',
    tier: 'tier1',
    description: 'Taking no risks, opening your first Fixed Taker position.',
  },
  {
    title: 'LEVERAGE CROWBAR',
    variant: 'leverageCrowbar',
    tier: 'tier2',
    description: 'Taking no risks, opening your first Fixed Taker position.',
  },
  {
    title: 'DELTA DEGEN',
    variant: 'deltaDegen',
    tier: 'tier1',
    description: 'Taking no risks, opening your first Fixed Taker position.',
  },
  {
    title: 'IRS CONNOISSEUR',
    variant: 'irsConnoisseur',
    tier: 'tier2',
    description: 'Taking no risks, opening your first Fixed Taker position.',
  },
  {
    title: 'SUSHI ROLL',
    variant: 'sushiRoll',
    tier: 'tier2',
    description: 'Taking no risks, opening your first Fixed Taker position.',
  },
  {
    title: 'DEGEN STUFF',
    variant: 'degenStuff',
    tier: 'tier3',
    description: 'Taking no risks, opening your first Fixed Taker position.',
  },
];

type CollectionBadge = {
  title: string;
  tier: BadgeTier;
  variant: BadgeVariant;
  achievedAt?: string;
};

export const collectionBadges: CollectionBadge[] = [
  {
    title: 'NO RISK HERE SER',
    variant: 'noRiskHereSer',
    tier: 'tier1',
    achievedAt: '10/12/2022',
  },
  {
    title: 'DELTA DEGEN',
    variant: 'deltaDegen',
    tier: 'tier1',
  },
  {
    title: 'LEVERAGE CROWBAR',
    variant: 'leverageCrowbar',
    tier: 'tier2',
  },
  {
    title: 'IRS CONNOISSEUR',
    variant: 'irsConnoisseur',
    tier: 'tier2',
  },
  {
    title: 'SUSHI ROLL',
    variant: 'sushiRoll',
    tier: 'tier2',
  },
  {
    title: 'DEGEN STUFF',
    variant: 'degenStuff',
    tier: 'tier3',
  },
  {
    title: 'SEASONED TRADER',
    variant: 'seasonedTrader',
    tier: 'legendary',
    achievedAt: '10/12/2022',
  },
  {
    title: 'OK BOOMER',
    variant: 'okBoomer',
    tier: '???',
    achievedAt: '10/12/2022',
  },
  {
    title: 'MAX BIDDING',
    variant: 'maxBidding',
    tier: '???',
    achievedAt: '10/12/2022',
  },
  {
    title: 'SUGAR DADDY',
    variant: 'sugarDaddy',
    tier: '???',
    achievedAt: '10/12/2022',
  },
  {
    title: 'LPOOR',
    variant: 'lpoor',
    tier: 'tier1',
  },
  {
    title: 'MONEY MONEY MONEY',
    variant: 'moneyMoneyMoney',
    tier: 'tier2',
  },
  {
    title: 'WATER HOSE',
    variant: 'waterHose',
    tier: 'tier2',
  },
  {
    title: 'RAIN MAKER',
    variant: 'rainMaker',
    tier: 'tier3',
  },
  {
    title: 'BE WATER MY FRIEND',
    variant: 'beWaterMyFriend',
    tier: 'legendary',
  },
];
