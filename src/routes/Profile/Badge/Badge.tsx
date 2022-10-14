import React from 'react';
import { Icon } from '@components/atomic';
import { BadgeVariant } from '../types';

export type BadgeProps = {
  variant: BadgeVariant;
};

export const Badge: React.FunctionComponent<BadgeProps> = ({ variant }) => {
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
