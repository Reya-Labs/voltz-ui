import { BadgeCardProps } from './BadgeCard/BadgeCard';

type Badge = {
  variant: BadgeCardProps['variant'];
  title: string;
  description: string;
  tier: 'tier1' | 'tier2' | 'tier3';
};

export const claimedBadges: Badge[] = [
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
