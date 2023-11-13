import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../types';
import { getMaxAvailableNotional } from '../getMaxAvailableNotional';

export const validateUserInputNotional = (state: Draft<SliceState>): void => {
  let error = null;
  if (state.userInput.notionalAmount.value > getMaxAvailableNotional(state)) {
    error = 'Not enough notional. Available:';
  }

  state.userInput.notionalAmount.error = error;
};
