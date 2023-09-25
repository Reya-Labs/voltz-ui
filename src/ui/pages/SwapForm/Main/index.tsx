import React from 'react';

import { useAppSelector } from '../../../../app';
import {
  selectFixedRateInfo,
  selectSwapFormAMM,
  selectVariableRateInfo,
} from '../../../../app/features/forms/trader/swap';
import { HistoricalRatesChart } from '../../../components/HistoricalRatesChart';
import { MainBox } from './Main.styled';
import { PoolHeader } from './PoolHeader';

export const Main: React.FunctionComponent = () => {
  const aMM = useAppSelector(selectSwapFormAMM);
  const fixedRateInfo = useAppSelector(selectFixedRateInfo);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  if (!aMM || fixedRateInfo === undefined || variableRateInfo === undefined) {
    return null;
  }

  return (
    <MainBox>
      <PoolHeader />
      <HistoricalRatesChart
        aMMId={aMM.id}
        aMMRateOracleId={aMM.rateOracle.id}
        fixedRate={fixedRateInfo}
        variableRate={variableRateInfo}
      />
    </MainBox>
  );
};
