import React from 'react';

import { selectLpFormAMM } from '../../../../app/features/lp-form';
import { useAppSelector } from '../../../../app/hooks';
import { HistoricalRatesChart } from '../../../components/HistoricalRatesChart';
import { BottomMainBox, MainBox } from './Main.styled';
import { PoolHeader } from './PoolHeader';
import { PositionDetails } from './PositionDetails';

export const Main: React.FunctionComponent = () => {
  const aMM = useAppSelector(selectLpFormAMM);
  if (!aMM) {
    return null;
  }

  return (
    <MainBox>
      <PoolHeader />
      <HistoricalRatesChart aMMId={aMM.id} aMMRateOracleId={aMM.rateOracle.id} />
      <BottomMainBox>
        <PositionDetails />
      </BottomMainBox>
    </MainBox>
  );
};
