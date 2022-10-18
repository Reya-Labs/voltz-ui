import React from 'react';
import { PillProps, Pill } from '@components/atomic';
import { BadgeTier, BadgeVariant } from '../types';
import { BADGE_VARIANT_TIER_MAP, TIER_COPY_MAP } from '../helpers';
import Skeleton from '@mui/material/Skeleton';

const TIER_PILL_VARIANT_MAP: Record<BadgeTier, PillProps['variant']> = {
  tier1: 'wildStrawberry',
  tier2: 'orangeYellow',
  tier3: 'skyBlueCrayola',
  easterEgg: 'vzCustomPink',
  legendary: 'vzCustomMarine',
};

export const BadgePill: React.FunctionComponent<{
  variant: BadgeVariant;
  loading?: boolean;
}> = ({ loading, variant }) => {
  if (loading) {
    return <Skeleton variant="text" sx={{ fontSize: '14px', width: 60 }} />;
  }
  const tier = BADGE_VARIANT_TIER_MAP[variant];
  return <Pill text={TIER_COPY_MAP[tier]} variant={TIER_PILL_VARIANT_MAP[tier]} />;
};
