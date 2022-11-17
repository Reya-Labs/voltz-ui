import React from 'react';
import { Skeleton, Icon } from './Badge.styled';
import { BadgeVariant1 } from '../getters/getPhase1Badges';

export type BadgeProps = {
  variant: BadgeVariant1 | 'noClaimedBadges';
  loading?: boolean;
};

export const Badge: React.FunctionComponent<BadgeProps> = ({ loading, variant }) => {
  if (loading) {
    return <Skeleton data-testid="Badge-Skeleton" variant="circular" />;
  }
  return <Icon data-testid={`Badge-${variant}`} name={variant} />;
};
