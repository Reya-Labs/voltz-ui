import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const getPreviousPositionRealizedPnLFromFees = (state: Draft<SliceState>) => {
  if (state.previousPosition !== null) {
    return state.previousPosition.realizedPnLFromFeesPaid;
  }

  return null;
};
