import React from 'react';

import { Pill, PillProps } from '../../../../components/atomic/Pill/Pill';
import { BadgeVariant } from '../../data/getSeasonBadges';
import { BADGE_VARIANT_TIER_MAP, BADGE_VARIANT_TRADER_LP_MAP, TIER_COPY_MAP } from '../../helpers';
import { BadgeTier } from '../../types';
import { Skeleton } from './BadgePill.styled';

const TIER_PILL_VARIANT_MAP: Record<BadgeTier, PillProps['variant']> = {
  tier1: 'wildStrawberry',
  tier2: 'orangeYellow',
  tier3: 'skyBlueCrayola',
  easterEgg: 'libertyDark',
  legendary: 'liberty',
};

export const BadgePill: React.FunctionComponent<{
  variant: BadgeVariant;
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
