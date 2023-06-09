import React from 'react';

import {
  selectFixedRateInfo,
  selectPreviousPositionId,
  selectRolloverLpFormAMM,
  selectVariableRateInfo,
} from '../../../../app/features/forms/lps/rollover-lp';
import { useAppSelector } from '../../../../app/hooks';
import { AdmitPassFlow } from '../../../components/AdmitPassFlow';
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
      {aMM.market.tags.isV2 ? <AdmitPassFlow poolCap={1000000} /> : null}
      <PoolHeader />
      <HistoricalRatesChart
        aMMId={aMM.id}
        aMMRateOracleId={aMM.rateOracle.id}
        fixedRate={fixedRateInfo}
        variableRate={variableRateInfo}
      />
      <BottomMainBox>
        <PositionDetails />
        <FormTransactionHistory positionId={previousPositionId} />
      </BottomMainBox>
    </MainBox>
  );
};
