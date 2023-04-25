import { Draft } from '@reduxjs/toolkit';

import { SliceState as LPFormSliceState } from '../../../lp-form/state';
import { SliceState as SwapFormSliceState } from '../../../swap-form/reducer';

export const isUserInputMarginError = (
  state: Draft<SwapFormSliceState | LPFormSliceState>,
): boolean => {
  return state.userInput.marginAmount.error !== null;
};
