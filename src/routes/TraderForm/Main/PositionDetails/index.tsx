import React from 'react';

import { selectSwapFormAMM, selectSwapFormMode } from '../../../../app/features/swap-form';
import { useAppSelector } from '../../../../app/hooks';
import { EditPositionDetailsUI } from './EditPositionDetailsUI';
import { NewPositionDetailsUI } from './NewPositionDetailsUI';

type PositionDetailsProps = {};
export const PositionDetails: React.FunctionComponent<PositionDetailsProps> = () => {
  const swapForMode = useAppSelector(selectSwapFormMode);
  const aMM = useAppSelector(selectSwapFormAMM);

  if (!aMM) {
    return null;
  }

  return swapForMode === 'new' ? (
    <NewPositionDetailsUI underlyingTokenName={aMM.underlyingToken.name} />
  ) : (
    <EditPositionDetailsUI underlyingTokenName={aMM.underlyingToken.name} />
  );
};
