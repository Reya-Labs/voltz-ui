import React from 'react';

import {
  selectFixedRateInfo,
  selectSwapFormAMM,
  selectVariableRateInfo,
} from '../../../../app/features/swap-form';
import { useAppSelector } from '../../../../app/hooks';
import { HistoricalRatesChart } from '../../../components/HistoricalRatesChart';
import { CashFlowCalculator } from './CashflowCalculator';
import { BottomMainBox, MainBox } from './Main.styled';
import { PoolHeader } from './PoolHeader';
import { PositionDetails } from './PositionDetails';

export const Main: React.FunctionComponent = () => {
  const aMM = useAppSelector(selectSwapFormAMM);
  const fixedRateInfo = useAppSelector(selectFixedRateInfo);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  if (!aMM) {
    return null;
  }

  return (
    <MainBox>
      <PoolHeader />
      <HistoricalRatesChart
        aMMId={aMM.id}
        aMMRateOracleId={aMM.rateOracle.id}
        fixedRate={fixedRateInfo.status !== 'success' ? null : fixedRateInfo.value}
        variableRate={variableRateInfo.status !== 'success' ? null : variableRateInfo.value}
      />
      <BottomMainBox>
        <PositionDetails />
        <CashFlowCalculator />
      </BottomMainBox>
    </MainBox>
  );
};
