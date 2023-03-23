import React from 'react';

import { HistoricalRatesChart } from '../../../components/HistoricalRatesChart';
import { BottomMainBox, MainBox } from './Main.styled';
import { PoolHeader } from './PoolHeader';
import { PositionDetails } from './PositionDetails';

export const Main: React.FunctionComponent = () => {
  return (
    <MainBox>
      <PoolHeader />
      <HistoricalRatesChart />
      <BottomMainBox>
        <PositionDetails />
      </BottomMainBox>
    </MainBox>
  );
};
