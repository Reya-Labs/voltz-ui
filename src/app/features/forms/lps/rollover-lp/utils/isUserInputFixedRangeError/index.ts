import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const isUserInputFixedRangeError = (state: Draft<SliceState>): boolean => {
  return state.userInput.fixedRange.error !== null;
};
