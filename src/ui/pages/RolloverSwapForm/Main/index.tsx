import React from 'react';

import {
  selectFixedRateInfo,
  selectInfoPostSwapAverageFixedRate,
  selectInfoPostSwapVariableTokenDeltaBalance,
  selectProspectiveSwapMode,
  selectSwapFormAMM,
  selectSwapFormPosition,
  selectVariableRateInfo,
} from '../../../../app/features/forms/rollover-swap-form';
import { useAppSelector } from '../../../../app/hooks';
import { CashFlowCalculator } from '../../../components/CashflowCalculator';
import { HistoricalRatesChart } from '../../../components/HistoricalRatesChart';
import { BottomMainBox, MainBox } from './Main.styled';
import { PoolHeader } from './PoolHeader';
import { PositionDetails } from './PositionDetails';

export const Main: React.FunctionComponent = () => {
  const aMM = useAppSelector(selectSwapFormAMM);
  const fixedRateInfo = useAppSelector(selectFixedRateInfo);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  const averageFixedRate = useAppSelector(selectInfoPostSwapAverageFixedRate);
  const variableTokenDeltaBalance = useAppSelector(selectInfoPostSwapVariableTokenDeltaBalance);
  const position = useAppSelector(selectSwapFormPosition);
  const mode = useAppSelector(selectProspectiveSwapMode);
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
      <BottomMainBox>
        <PositionDetails />
        <CashFlowCalculator
          aMM={aMM}
          averageFixedRate={averageFixedRate}
          mode={mode}
          position={position}
          variableTokenDeltaBalance={variableTokenDeltaBalance}
        />
      </BottomMainBox>
    </MainBox>
  );
};
