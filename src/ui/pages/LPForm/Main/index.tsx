import React from 'react';

import {
  selectFixedRateInfo,
  selectLpFormAMM,
  selectVariableRateInfo,
} from '../../../../app/features/lp-form';
import { useAppSelector } from '../../../../app/hooks';
import { HistoricalRatesChart } from '../../../components/HistoricalRatesChart';
import { BottomMainBox, MainBox } from './Main.styled';
import { PoolHeader } from './PoolHeader';
import { PositionDetails } from './PositionDetails';

export const Main: React.FunctionComponent = () => {
  const aMM = useAppSelector(selectLpFormAMM);
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
      </BottomMainBox>
    </MainBox>
  );
};
