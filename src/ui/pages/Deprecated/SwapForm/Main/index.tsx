import React from 'react';

import { useAppSelector } from '../../../../../app';
import {
  selectFixedRateInfo,
  selectInfoPostSwapAverageFixedRate,
  selectInfoPostSwapVariableTokenDeltaBalance,
  selectProspectiveSwapMode,
  selectSwapFormAMM,
  selectSwapFormPosition,
  selectVariableRateInfo,
} from '../../../../../app/features/forms/trader/deprecated/swap';
import { isV2AMM } from '../../../../../utilities/amm';
import { DeprecatedCashFlowCalculator } from '../../../../components/_Deprecated/CashflowCalculator';
import { AlphaPassFlow } from '../../../../components/AlphaPassFlow';
import { FormTransactionHistory } from '../../../../components/FormTransactionHistory';
import { HistoricalRatesChart } from '../../../../components/HistoricalRatesChart';
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
          <DeprecatedCashFlowCalculator
            aMM={aMM}
            averageFixedRate={averageFixedRate}
            mode={mode}
            position={position}
            variableTokenDeltaBalance={variableTokenDeltaBalance}
          />
        )}
        <FormTransactionHistory positionId={position?.id} />
      </BottomMainBox>
    </MainBox>
  );
};
