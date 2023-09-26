import React from 'react';

import { useAppSelector } from '../../../../app';
import {
  selectFixedRateInfo,
  selectInfoPostSwapAverageFixedRate,
  selectInfoPostSwapVariableTokenDeltaBalance,
  selectPreviousPositionId,
  selectProspectiveSwapMode,
  selectRolloverSwapFormAMM,
  selectVariableRateInfo,
} from '../../../../app/features/forms/trader/rollover-swap';
import { isV2AMM } from '../../../../utilities/amm';
import { AlphaPassFlow } from '../../../components/AlphaPassFlow';
import { CashFlowCalculator } from '../../../components/CashflowCalculator';
import { FormTransactionHistory } from '../../../components/FormTransactionHistory';
import { HistoricalRatesChart } from '../../../components/HistoricalRatesChart';
import { BottomMainBox, MainBox } from './Main.styled';
import { PoolHeader } from './PoolHeader';
import { PositionDetails } from './PositionDetails';

export const Main: React.FunctionComponent = () => {
  const aMM = useAppSelector(selectRolloverSwapFormAMM);
  const fixedRateInfo = useAppSelector(selectFixedRateInfo);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  const averageFixedRate = useAppSelector(selectInfoPostSwapAverageFixedRate);
  const variableTokenDeltaBalance = useAppSelector(selectInfoPostSwapVariableTokenDeltaBalance);
  const mode = useAppSelector(selectProspectiveSwapMode);
  const previousPositionId = useAppSelector(selectPreviousPositionId);
  if (!aMM || fixedRateInfo === undefined || variableRateInfo === undefined) {
    return null;
  }

  return (
    <MainBox>
      {isV2AMM(aMM) ? <AlphaPassFlow chainId={aMM.chainId} /> : null}
      <PoolHeader />
      <HistoricalRatesChart
        fixedRate={fixedRateInfo}
        poolId={aMM.id}
        poolRateOracleId={aMM.rateOracle.id}
        variableRate={variableRateInfo}
      />
      <BottomMainBox>
        <PositionDetails />
        {isV2AMM(aMM) ? null : (
          <CashFlowCalculator
            aMM={aMM}
            averageFixedRate={averageFixedRate}
            mode={mode}
            position={null}
            variableTokenDeltaBalance={variableTokenDeltaBalance}
          />
        )}
        <FormTransactionHistory positionId={previousPositionId} />
      </BottomMainBox>
    </MainBox>
  );
};
