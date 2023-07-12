import { Draft } from '@reduxjs/toolkit';

import { SliceState as LPFormSliceState } from '../../../lps/lp/state';
import { SliceState as RolloverLpFormSliceState } from '../../../lps/rollover-lp/state';
import { isUserInputFixedRangeError } from '../isUserInputFixedRangeError';

export const getProspectiveLpFixedLow = (
  state: Draft<LPFormSliceState> | Draft<RolloverLpFormSliceState>,
): number | null => {
  if (isUserInputFixedRangeError(state)) {
    return null;
  }

  return state.userInput.fixedRange.lower;
};
