import { Draft } from '@reduxjs/toolkit';

import { SliceState as LPFormSliceState } from '../../../lp-form/reducer';
import { SliceState as SwapFormSliceState } from '../../../swap-form/reducer';

export const isUserInputNotionalError = (
  state: Draft<SwapFormSliceState | LPFormSliceState>,
): boolean => {
  return state.userInput.notionalAmount.error !== null;
};
