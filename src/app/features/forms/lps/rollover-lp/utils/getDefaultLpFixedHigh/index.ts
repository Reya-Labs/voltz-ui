import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const getDefaultLpFixedHigh = (state: Draft<SliceState>): number => {
  if (!state.previousPosition) {
    // TODO: Artur layer in smarter dynamic default range logic in here
    return 3;
  }
  return state.previousPosition.fixedRateUpper.toNumber();
};
