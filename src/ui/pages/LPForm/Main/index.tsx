import React from 'react';

import { HistoricalRatesChart } from '../../../components/HistoricalRatesChart';
import { MainBox } from './Main.styled';
import { PoolHeader } from './PoolHeader';

export const Main: React.FunctionComponent = () => {
  return (
    <MainBox>
      <PoolHeader />
      <HistoricalRatesChart />
    </MainBox>
  );
};
