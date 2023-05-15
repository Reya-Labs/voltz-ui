import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';
import { isUserInputFixedRangeError } from '../isUserInputFixedRangeError';

export const getProspectiveLpFixedLow = (state: Draft<SliceState>): number | null => {
  if (isUserInputFixedRangeError(state)) {
    return null;
  }

  return state.userInput.fixedRange.lower;
};
