import { Pill, PillProps } from 'brokoli-ui';
import React from 'react';

import { BadgeVariant } from '../../data/getSeasonBadges';
import { BADGE_VARIANT_TIER_MAP, BADGE_VARIANT_TRADER_LP_MAP, TIER_COPY_MAP } from '../../helpers';
import { BadgeTier } from '../../types';
import { Skeleton } from './BadgePill.styled';

const TIER_COLOR_TOKEN_MAP: Record<BadgeTier, PillProps['colorToken']> = {
  tier1: 'wildStrawberry',
  tier2: 'orangeYellow',
  tier3: 'skyBlueCrayola',
  easterEgg: 'rainbow',
  legendary: 'lavenderWeb',
};

export const BadgePill: React.FunctionComponent<{
  variant: BadgeVariant;
  loading?: boolean;
}> = ({ loading, variant }) => {
  if (loading) {
    return (
      <Skeleton
        colorToken="liberty2"
        data-testid="BadgePill-Skeleton"
        typographyToken="primaryBodySmallRegular"
        variant="rectangular"
      />
    );
  }
  const tier = BADGE_VARIANT_TIER_MAP[variant];
  const category = BADGE_VARIANT_TRADER_LP_MAP[variant];
  const categoryText = category
    ? category === 'lp'
      ? 'LP: '
      : `${category[0].toUpperCase()}${category.substring(1)}: `
    : '';
  const tierText = TIER_COPY_MAP[tier];
  return (
    <Pill
      colorToken={TIER_COLOR_TOKEN_MAP[tier]}
      data-testid={`BadgePill-Pill-${tier}-${category}-${variant}`}
      typographyToken="primaryBodySmallRegular"
    >
      {tier !== 'legendary' && tier !== 'easterEgg' ? categoryText + tierText : tierText}
    </Pill>
  );
};
