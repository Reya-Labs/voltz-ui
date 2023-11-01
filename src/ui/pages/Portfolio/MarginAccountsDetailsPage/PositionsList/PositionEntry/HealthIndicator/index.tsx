import { AttentionIndicator, ColorTokens } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../../../app/features/portfolio/types';
import { HealthIndicatorBox } from './HealthIndicator.styled';

const HealthColorMap: Record<PositionUI['status']['health'], ColorTokens | undefined> = {
  danger: 'error100',
  healthy: undefined,
  warning: 'warning100',
};

export const HealthIndicator: React.FunctionComponent<{
  health: PositionUI['status']['health'];
}> = ({ health }) => {
  if (HealthColorMap[health] === undefined) {
    return null;
  }
  return (
    <HealthIndicatorBox>
      <AttentionIndicator colorToken={HealthColorMap[health]!} />
    </HealthIndicatorBox>
  );
};
