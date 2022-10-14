import React from 'react';
import { Icon } from '@components/atomic';

export type BadgeProps = {
  variant:
    | 'degenStuff'
    | 'deltaDegen'
    | 'irsConnoisseur'
    | 'leverageCrowbar'
    | 'noRiskHereSer'
    | 'sushiRoll';
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
