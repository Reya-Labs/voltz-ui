import React from 'react';

import { CashFlowCalculator } from './CashflowCalculator';
import { Chart } from './Chart';
import { BottomMainBox, MainBox } from './Main.styled';
import { PoolHeader } from './PoolHeader';
import { PositionDetails } from './PositionDetails';

export const Main: React.FunctionComponent = () => {
  return (
    <MainBox>
      <PoolHeader />
      <Chart />
      <BottomMainBox>
        <PositionDetails />
        <CashFlowCalculator />
      </BottomMainBox>
    </MainBox>
  );
};
