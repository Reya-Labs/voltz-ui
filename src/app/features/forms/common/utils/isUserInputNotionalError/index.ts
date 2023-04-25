import { Draft } from '@reduxjs/toolkit';

import { SliceState as LPFormSliceState } from '../../../lp-form/state';
import { SliceState as SwapFormSliceState } from '../../../swap-form/state';

export const isUserInputNotionalError = (
  state: Draft<SwapFormSliceState | LPFormSliceState>,
): boolean => {
  return state.userInput.notionalAmount.error !== null;
};
