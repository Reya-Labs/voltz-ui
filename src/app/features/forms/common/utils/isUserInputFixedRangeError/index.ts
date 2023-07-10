import { Draft } from '@reduxjs/toolkit';

import { SliceState as LPFormSliceState } from '../../../lps/lp/state';
import { SliceState as RolloverLpFormSliceState } from '../../../lps/rollover-lp/state';

export const isUserInputFixedRangeError = (
  state: Draft<LPFormSliceState> | Draft<RolloverLpFormSliceState>,
): boolean => {
  return state.userInput.fixedRange.error !== null;
};
