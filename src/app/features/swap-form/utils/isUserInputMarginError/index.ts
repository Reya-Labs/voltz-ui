import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const isUserInputMarginError = (state: Draft<SliceState>): boolean => {
  return state.userInput.marginAmount.error !== null;
};
