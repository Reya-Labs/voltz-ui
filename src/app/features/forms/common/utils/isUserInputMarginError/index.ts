import { Draft } from '@reduxjs/toolkit';

import { SliceState as LPFormSliceState } from '../../../lp-form/state';
import { SliceState as RolloverLpFormSliceState } from '../../../rollover-lp-form/state';
import { SliceState as RolloverSwapFormSliceState } from '../../../trader/rollover-swap-form/state';
import { SliceState as SwapFormSliceState } from '../../../trader/swap-form/state';

export const isUserInputMarginError = (
  state: Draft<
    SwapFormSliceState | LPFormSliceState | RolloverSwapFormSliceState | RolloverLpFormSliceState
  >,
): boolean => {
  return state.userInput.marginAmount.error !== null;
};
