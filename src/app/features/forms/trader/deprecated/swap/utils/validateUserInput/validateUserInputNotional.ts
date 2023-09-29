import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';
import { getAdjustedSwapNotional } from '../getAdjustedSwapNotional';
import { getAvailableNotional } from '../getAvailableNotional';
import { hasExistingPosition } from '../hasExistingPosition';

export const validateUserInputNotional = (state: Draft<SliceState>): void => {
  let error = null;
  if (
    state.userInput.notionalAmount.editMode === 'add' &&
    getAdjustedSwapNotional(state) > getAvailableNotional(state)
  ) {
    error = 'Not enough liquidity. Available:';
  }

  if (
    hasExistingPosition(state) &&
    state.userInput.notionalAmount.editMode === 'remove' &&
    state.userInput.notionalAmount.value > getAvailableNotional(state)
  ) {
    error = 'Not enough notional. Available:';
  }

  state.userInput.notionalAmount.error = error;
};
