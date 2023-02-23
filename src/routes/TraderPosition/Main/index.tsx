import React from 'react';

import { CashFlowCalculator } from '../CashflowCalculator';
import { Chart } from './Chart';
import { MainBox } from './Main.styled';
import { PoolHeader } from './PoolHeader';
import { PositionDetails } from './PositionDetails';

export const Main: React.FunctionComponent = () => {
  return (
    <MainBox>
      <PoolHeader />
      <Chart />
      <PositionDetails />
      <CashFlowCalculator />
    </MainBox>
  );
};
