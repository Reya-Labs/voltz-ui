import React from 'react';
import { PillProps, Pill } from '@components/atomic';
import { BadgeTier, ComingSoonBadges } from '../types';
import { BADGE_VARIANT_TIER_MAP, BADGE_VARIANT_TRADER_LP_MAP, TIER_COPY_MAP } from '../helpers';
import { BadgeVariant } from '@graphql';
import { Skeleton } from './BadgePill.styled';

const TIER_PILL_VARIANT_MAP: Record<BadgeTier, PillProps['variant']> = {
  tier1: 'wildStrawberry',
  tier2: 'orangeYellow',
  tier3: 'skyBlueCrayola',
  easterEgg: 'vzCustomPink',
  legendary: 'vzCustomMarine',
};

export const BadgePill: React.FunctionComponent<{
  variant: BadgeVariant | ComingSoonBadges;
  loading?: boolean;
}> = ({ loading, variant }) => {
  if (loading) {
    return <Skeleton variant="text" />;
  }
  const tier = BADGE_VARIANT_TIER_MAP[variant];
  const categoryText = BADGE_VARIANT_TRADER_LP_MAP[variant]
    ? `${BADGE_VARIANT_TRADER_LP_MAP[variant]}: `.toUpperCase()
    : '';
  const tierText = TIER_COPY_MAP[tier];
  return <Pill text={categoryText + tierText} variant={TIER_PILL_VARIANT_MAP[tier]} />;
};
