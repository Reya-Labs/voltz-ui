import { Draft } from '@reduxjs/toolkit';

import { SliceState as LPFormSliceState } from '../../../lp-form/state';
import { SliceState as RolloverSwapFormSliceState } from '../../../rollover-swap-form/state';
import { SliceState as SwapFormSliceState } from '../../../swap-form/state';

export const isUserInputMarginError = (
  state: Draft<SwapFormSliceState | LPFormSliceState | RolloverSwapFormSliceState>,
): boolean => {
  return state.userInput.marginAmount.error !== null;
};
