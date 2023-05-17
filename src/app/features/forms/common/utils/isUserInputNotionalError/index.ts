import { Draft } from '@reduxjs/toolkit';

import { SliceState as LPFormSliceState } from '../../../lps/lp/state';
import { SliceState as RolloverLpFormSliceState } from '../../../lps/rollover-lp/state';
import { SliceState as RolloverSwapFormSliceState } from '../../../trader/rollover-swap/state';
import { SliceState as SwapFormSliceState } from '../../../trader/swap/state';

export const isUserInputNotionalError = (
  state: Draft<
    RolloverLpFormSliceState | RolloverSwapFormSliceState | SwapFormSliceState | LPFormSliceState
  >,
): boolean => {
  return state.userInput.notionalAmount.error !== null;
};
