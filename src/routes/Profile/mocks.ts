import { BadgeCardProps } from './BadgeCard/BadgeCard';

type Badge = {
  variant: BadgeCardProps['variant'];
  title: string;
  description: string;
  tier: 'tier1' | 'tier2' | 'tier3';
};

export const claimedBadges: Badge[] = [
  {
    title: 'Open a FT position',
    variant: 'badge1',
    tier: 'tier1',
    description: 'Taking no risks, opening your first Fixed Taker position.',
  },
  {
    title: 'Open a VT position',
    variant: 'badge2',
    tier: 'tier1',
    description: 'Looking to collectat that juicy delta. Opening your first VT position',
  },
  {
    title: '100x LEVERAGE',
    variant: 'badge3',
    tier: 'tier2',
    description: 'Looking to collectat that juicy delta. Opening your first VT position',
  },
  {
    title: 'Open a FT position',
    variant: 'badge1',
    tier: 'tier1',
    description: 'Taking no risks, opening your first Fixed Taker position.',
  },
  {
    title: 'Open a VT position',
    variant: 'badge2',
    tier: 'tier3',
    description: 'Looking to collectat that juicy delta. Opening your first VT position',
  },
  {
    title: '100x LEVERAGE',
    variant: 'badge3',
    tier: 'tier2',
    description: 'Looking to collectat that juicy delta',
  },
];
