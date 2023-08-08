import React from 'react';

import { PositionsFilterId } from '../../../../../../../../app/features/portfolio/types';
import { ActivePositionsHeader } from './ActivePositionsHeader';
import { MaturedPositionsHeader } from './MaturedPositionsHeader';
import { SettledPositionsHeader } from './SettledPositionsHeader';

type PositionsHeaderProps = {
  positionsFilterId: PositionsFilterId;
};

export const PositionsHeader: React.FunctionComponent<PositionsHeaderProps> = ({
  positionsFilterId,
}) => {
  if (positionsFilterId === 'matured') {
    return <MaturedPositionsHeader />;
  }
  if (positionsFilterId === 'settled') {
    return <SettledPositionsHeader />;
  }
  return <ActivePositionsHeader />;
};
