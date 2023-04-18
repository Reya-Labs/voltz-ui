import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';
import { hasExistingPosition } from '../hasExistingPosition';

export const getRealizedPnLFromSwaps = (state: Draft<SliceState>) => {
  if (hasExistingPosition(state)) {
    // feels redundunt
    if (state.selectedPosition) {
      return state.selectedPosition.realizedPnLFromSwaps;
    }
  }
  return null;
};
