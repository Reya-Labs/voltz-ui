import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const getDefaultLpFixedLow = (state: Draft<SliceState>): number => {
  if (!state.previousPosition) {
    // TODO: Artur layer in smarter dynamic default range logic in here
    return 1;
  }
  return state.previousPosition.fixedRateLower.toNumber();
};
