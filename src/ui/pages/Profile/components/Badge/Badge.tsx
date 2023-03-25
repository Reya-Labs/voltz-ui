import React from 'react';

import { BadgeVariant } from '../../data/getSeasonBadges';
import { Icon, Skeleton } from './Badge.styled';

export type BadgeProps = {
  variant: BadgeVariant | 'noClaimedBadges';
  loading?: boolean;
};

export const Badge: React.FunctionComponent<BadgeProps> = ({ loading, variant }) => {
  if (loading) {
    return <Skeleton data-testid="Badge-Skeleton" variant="circular" />;
  }
  return <Icon data-testid={`Badge-${variant}`} name={variant} />;
};
