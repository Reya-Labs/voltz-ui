import { PillSelector, Typography } from 'brokoli-ui';
import React, { useState } from 'react';

import { selectPositionsSummary } from '../../../../../app/features/portfolio';
import { useAppSelector } from '../../../../../app/hooks';
import { capitalize } from '../../../../../utilities/capitalize';
import { PositionsFilterId, PositionsList } from '../PositionsList';
import { PortfolioHeader } from './PortfolioHeader';
import { BottomBox, PositionsBox, PositionsSelectorBox } from './Positions.styled';

export const Positions: React.FunctionComponent = () => {
  const {
    activePositionsLength,
    maturedPositionsLength,
    settledPositionsLength,
    positionsLength,
    filterOptions,
  } = useAppSelector(selectPositionsSummary);
  const [activeFilter, setActiveFilter] = useState<PositionsFilterId>('active');

  return (
    <PositionsBox>
      <PortfolioHeader />
      <BottomBox>
        <PositionsSelectorBox>
          <Typography colorToken="lavenderWeb" typographyToken="primaryBodyMediumBold">
            {activeFilter === 'active'
              ? activePositionsLength
              : activeFilter === 'settled'
              ? settledPositionsLength
              : maturedPositionsLength}{' '}
            {capitalize(activeFilter)} Positions
          </Typography>
          <PillSelector
            activePillId={activeFilter as string}
            disabled={positionsLength === '--'}
            pillOptions={filterOptions}
            variant="regular"
            onPillClick={(id) => setActiveFilter(id as PositionsFilterId)}
          />
        </PositionsSelectorBox>
        <PositionsList positionsFilterId={activeFilter} />
      </BottomBox>
    </PositionsBox>
  );
};
