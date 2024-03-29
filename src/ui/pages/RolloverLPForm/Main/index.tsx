import React from 'react';

import { useAppSelector } from '../../../../app';
import {
  selectFixedRateInfo,
  selectPreviousPositionId,
  selectRolloverLpFormAMM,
  selectVariableRateInfo,
} from '../../../../app/features/forms/lps/rollover-lp';
import { isV2AMM } from '../../../../utilities/amm';
import { AlphaPassFlow } from '../../../components/AlphaPassFlow';
import { FormTransactionHistory } from '../../../components/FormTransactionHistory';
import { HistoricalRatesChart } from '../../../components/HistoricalRatesChart';
import { BottomMainBox, MainBox } from './Main.styled';
import { PoolHeader } from './PoolHeader';
import { PositionDetails } from './PositionDetails';

export const Main: React.FunctionComponent = () => {
  const aMM = useAppSelector(selectRolloverLpFormAMM);
  const fixedRateInfo = useAppSelector(selectFixedRateInfo);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
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
        <FormTransactionHistory positionId={previousPositionId} />
      </BottomMainBox>
    </MainBox>
  );
};
