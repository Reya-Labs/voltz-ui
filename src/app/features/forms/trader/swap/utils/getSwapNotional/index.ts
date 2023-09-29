import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const getSwapNotional = (state: Draft<SliceState>): number => {
  return state.userInput.notionalAmount.value;
};
