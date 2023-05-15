import { Draft } from '@reduxjs/toolkit';

import { SliceState as RolloverLpFormSliceState } from '../../../lps/rollover-lp/state';
import { SliceState as RolloverSwapFormSliceState } from '../../../trader/rollover-swap/state';

export const getRealizedPnLFromSwaps = (
  state: Draft<RolloverSwapFormSliceState | RolloverLpFormSliceState>,
) => {
  if (state.previousPosition !== null) {
    return state.previousPosition.realizedPnLFromSwaps;
  }

  return null;
};
