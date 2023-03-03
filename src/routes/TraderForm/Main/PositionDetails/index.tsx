import React from 'react';

import {
  selectInfoPostSwap,
  selectMode,
  selectNotionalAmount,
  selectSwapFormAMM,
  selectVariableRateInfo,
} from '../../../../app/features/swap-form';
import { useAppSelector } from '../../../../app/hooks';
import { compactFormatToParts, formatNumber, stringToBigFloat } from '../../../../utilities/number';
import { NewPositionDetailsUI } from './NewPositionDetailsUI';

type PositionDetailsProps = {};

export const PositionDetails: React.FunctionComponent<PositionDetailsProps> = () => {
  const aMM = useAppSelector(selectSwapFormAMM);
  const notional = useAppSelector(selectNotionalAmount);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  const infoPostSwap = useAppSelector(selectInfoPostSwap);
  const mode = useAppSelector(selectMode);
  // const isEditMode = useAppSelector(selectSwapFormEdit);
  const isEditMode = false;
  if (!aMM) {
    return null;
  }

  const fixedRate =
    infoPostSwap.status === 'success' ? formatNumber(infoPostSwap.value.averageFixedRate) : '--';
  const variableRate =
    variableRateInfo.status === 'success' ? formatNumber(variableRateInfo.value) : '--';

  const receivingRate = mode === 'fixed' ? fixedRate : variableRate;
  const payingRate = mode === 'fixed' ? variableRate : fixedRate;
  // TODO: Alex, nice to have, some stuff can be moved to selectors
  let compactNotionalSuffix = '';
  let compactNotionalNumber = '--';
  if (notional.value && !notional.error) {
    const compactParts = compactFormatToParts(stringToBigFloat(notional.value));
    compactNotionalSuffix = compactParts.compactSuffix;
    compactNotionalNumber = compactParts.compactNumber;
  }

  if (isEditMode) {
    return null;
  }

  return (
    <NewPositionDetailsUI
      compactNotionalNumber={compactNotionalNumber}
      compactNotionalSuffix={compactNotionalSuffix}
      mode={mode}
      payingRate={payingRate}
      receivingRate={receivingRate}
      underlyingTokenName={aMM.underlyingToken.name}
    />
  );
};
