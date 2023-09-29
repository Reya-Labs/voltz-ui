import { Draft } from '@reduxjs/toolkit';

import { SliceState as LPFormSliceState } from '../../../lps/lp/state';
import { SliceState as RolloverLpFormSliceState } from '../../../lps/rollover-lp/state';
import { SliceState as SwapFormSliceState } from '../../../trader/deprecated/swap/state';
import { SliceState as RolloverSwapFormSliceState } from '../../../trader/rollover-swap/state';

export const checkLowLeverageNotification = (
  state: Draft<
    RolloverSwapFormSliceState | SwapFormSliceState | LPFormSliceState | RolloverLpFormSliceState
  >,
) => {
  return !!(
    state.amm &&
    state.userInput.leverage !== null &&
    state.userInput.leverage < state.amm.minLeverageAllowed &&
    !state.showLowLeverageNotification
  );
};
