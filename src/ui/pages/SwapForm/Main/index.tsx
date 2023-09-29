import React from 'react';

import { useAppSelector } from '../../../../app';
import {
  selectFixedRateInfo,
  selectSwapFormPool,
  selectVariableRateInfo,
} from '../../../../app/features/forms/trader/swap';
import { HistoricalRatesChart } from '../../../components/HistoricalRatesChart';
import { MainBox } from './Main.styled';
import { PoolHeader } from './PoolHeader';

export const Main: React.FunctionComponent = () => {
  const pool = useAppSelector(selectSwapFormPool);
  const fixedRateInfo = useAppSelector(selectFixedRateInfo);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  if (!pool || fixedRateInfo === undefined || variableRateInfo === undefined) {
    return null;
  }

  return (
    <MainBox>
      <PoolHeader />
      <HistoricalRatesChart
        fixedRate={fixedRateInfo}
        poolId={pool.id}
        poolRateOracleId={pool.rateOracle.address}
        variableRate={variableRateInfo}
      />
    </MainBox>
  );
};
