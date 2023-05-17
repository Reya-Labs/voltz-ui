import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';
import { isUserInputFixedRangeError } from '../isUserInputFixedRangeError';

// todo: FB same as in rollover-lp-form
export const getProspectiveLpFixedHigh = (state: Draft<SliceState>): number | null => {
  if (isUserInputFixedRangeError(state)) {
    return null;
  }

  return state.userInput.fixedRange.upper;
};
