import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';
import { hasExistingPosition } from '../hasExistingPosition';

export const getUnrealizedPnLFromSwaps = (state: Draft<SliceState>) => {
  if (hasExistingPosition(state)) {
    if (state.selectedPosition) {
      return state.selectedPosition?.unrealizedPnLFromSwaps;
    }
  }

  return null;
};
