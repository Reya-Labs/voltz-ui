import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const isUserInputFixedRangeError = (state: Draft<SliceState>): boolean => {
  return state.userInput.fixedRange.error !== null;
};
