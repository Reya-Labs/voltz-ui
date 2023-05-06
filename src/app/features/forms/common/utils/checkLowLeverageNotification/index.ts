import { Draft } from '@reduxjs/toolkit';

import { SliceState as LPFormSliceState } from '../../../lp-form/state';
import { SliceState as RolloverSwapFormSliceState } from '../../../trader/rollover-swap-form/state';
import { SliceState as SwapFormSliceState } from '../../../trader/swap-form/state';

export const checkLowLeverageNotification = (
  state: Draft<RolloverSwapFormSliceState | SwapFormSliceState | LPFormSliceState>,
) => {
  return !!(
    state.amm &&
    state.userInput.leverage !== null &&
    state.userInput.leverage < state.amm.minLeverageAllowed &&
    !state.showLowLeverageNotification
  );
};
