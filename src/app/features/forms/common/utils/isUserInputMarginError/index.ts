import { Draft } from '@reduxjs/toolkit';

import { SliceState as LPFormSliceState } from '../../../lps/lp/state';
import { SliceState as RolloverLpFormSliceState } from '../../../lps/rollover-lp/state';
import { SliceState as RolloverSwapFormSliceState } from '../../../trader/rollover-swap/state';
import { SliceState as SwapFormSliceState } from '../../../trader/swap/state';

export const isUserInputMarginError = (
  state: Draft<
    SwapFormSliceState | LPFormSliceState | RolloverSwapFormSliceState | RolloverLpFormSliceState
  >,
): boolean => {
  return state.userInput.marginAmount.error !== null;
};
