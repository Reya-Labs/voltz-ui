import React from 'react';

import {
  selectFixedRateInfo,
  selectInfoPostSwapAverageFixedRate,
  selectInfoPostSwapVariableTokenDeltaBalance,
  selectProspectiveSwapMode,
  selectSwapFormAMM,
  selectSwapFormPosition,
  selectVariableRateInfo,
} from '../../../../app/features/forms/trader/swap';
import { useAppSelector } from '../../../../app/hooks';
import { isV2AMM } from '../../../../utilities/amm';
import { AlphaPassFlow } from '../../../components/AlphaPassFlow';
import { CashFlowCalculator } from '../../../components/CashflowCalculator';
import { FormTransactionHistory } from '../../../components/FormTransactionHistory';
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
      {isV2AMM(aMM) ? <AlphaPassFlow chainId={aMM.chainId} /> : null}
      <PoolHeader />
      <HistoricalRatesChart
        aMMId={aMM.id}
        aMMRateOracleId={aMM.rateOracle.id}
        fixedRate={fixedRateInfo}
        variableRate={variableRateInfo}
      />
      <BottomMainBox>
        <PositionDetails />
        {isV2AMM(aMM) ? null : (
          <CashFlowCalculator
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
