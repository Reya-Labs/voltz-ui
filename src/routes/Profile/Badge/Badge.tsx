import React from 'react';
import { Icon } from '@components/atomic';
import { BadgeVariant } from '../types';
import Skeleton from '@mui/material/Skeleton';

export type BadgeProps = {
  variant: BadgeVariant | 'noClaimedBadges';
  loading?: boolean;
};

export const Badge: React.FunctionComponent<BadgeProps> = ({ loading, variant }) => {
  if (loading) {
    return (
      <Skeleton
        variant="circular"
        sx={{
          width: '168px',
          height: '168px',
        }}
      />
    );
  }
  return (
    <Icon
      sx={{
        width: '168px',
        height: '168px',
      }}
      data-testid={`Badge-${variant}`}
      name={variant}
    />
  );
};
