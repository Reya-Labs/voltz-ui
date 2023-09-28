import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';
import { getAvailableNotional } from '../getAvailableNotional';

export const validateUserInputNotional = (state: Draft<SliceState>): void => {
  let error = null;
  if (state.userInput.notionalAmount.value > getAvailableNotional(state)) {
    error = 'Not enough notional. Available:';
  }

  state.userInput.notionalAmount.error = error;
};
