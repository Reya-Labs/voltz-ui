import { PillSelector, Typography } from 'brokoli-ui';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../../../app';
import { selectMarginAccountPositionsSummary } from '../../../../../app/features/portfolio';
import { PositionsFilterId } from '../../../../../app/features/portfolio/types';
import { capitalize } from '../../../../../utilities/capitalize';
import { PositionsList } from '../PositionsList';
import { BottomBox, PositionsBox, PositionsSelectorBox } from './Positions.styled';

export const Positions: React.FunctionComponent = () => {
  const { marginAccountId } = useParams();

  const {
    activePositionsLength,
    maturedPositionsLength,
    settledPositionsLength,
    positionsLength,
    filterOptions,
  } = useAppSelector(selectMarginAccountPositionsSummary(marginAccountId));
  const [activeFilter, setActiveFilter] = useState<PositionsFilterId>('active');

  return (
    <PositionsBox>
      <BottomBox>
        <PositionsSelectorBox>
          <Typography colorToken="white100" typographyToken="primaryBodyMediumBold">
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
