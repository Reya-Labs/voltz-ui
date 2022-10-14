import React from 'react';
import { PillProps, Pill } from '@components/atomic';
import { BadgeTier } from '../types';

const TIER_PILL_VARIANT_MAP: Record<BadgeTier, PillProps['variant']> = {
  tier1: 'wildStrawberry',
  tier2: 'orangeYellow',
  tier3: 'skyBlueCrayola',
  '???': 'vzCustomPink',
  legendary: 'vzCustomMarine',
};

const TIER_COPY_MAP: Record<BadgeTier, string> = {
  tier1: 'TIER 1',
  tier2: 'TIER 2',
  tier3: 'TIER 3',
  legendary: 'LEGENDARY',
  '???': '???',
};

export const BadgePill: React.FunctionComponent<{
  tier: BadgeTier;
}> = ({ tier }) => {
  return <Pill text={TIER_COPY_MAP[tier]} variant={TIER_PILL_VARIANT_MAP[tier]} />;
};
