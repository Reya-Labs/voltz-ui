import { PillSelector, Typography } from 'brokoli-ui';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { selectMarginAccountPositionsSummary } from '../../../../../app/features/portfolio';
import { PositionsFilterId } from '../../../../../app/features/portfolio/types';
import { useAppSelector } from '../../../../../app/hooks';
import { capitalize } from '../../../../../utilities/capitalize';
import { PositionsList } from '../PositionsList';
import { BottomBox, PositionsBox, PositionsSelectorBox } from './Positions.styled';

export const Positions: React.FunctionComponent = () => {
  const { marginAccountId } = useParams();

  const {
    activePositionsLength,
    maturedPositionsLength,
    settledPositionsLength,
    healthyPositionsLength,
    totalPortfolioNotionalValueUSDCompactFormatted,
    totalPortfolioMarginValueUSDFormatted,
    totalPortfolioRealizedPNLValueUSDFormatted,
    totalPortfolioValueUSDFormatted,
    totalPortfolioUnrealizedPNLValueUSDFormatted,
    warningPositionsLength,
    dangerPositionsLength,
    positionsLength,
    filterOptions,
  } = useAppSelector(selectMarginAccountPositionsSummary(marginAccountId));
  const [activeFilter, setActiveFilter] = useState<PositionsFilterId>('active');

  return (
    <PositionsBox>
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
