import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';
import { isUserInputFixedRangeError } from '../isUserInputFixedRangeError';

export const getProspectiveLpFixedHigh = (state: Draft<SliceState>): number | null => {
  if (isUserInputFixedRangeError(state)) {
    return null;
  }

  return state.userInput.fixedRange.upper;
};
