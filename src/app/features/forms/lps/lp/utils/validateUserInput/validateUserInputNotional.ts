import { Draft } from '@reduxjs/toolkit';
import { Position } from '@voltz-protocol/v1-sdk';

import { SliceState } from '../../state';
import { hasExistingPosition } from '../hasExistingPosition';

export const validateUserInputNotional = (state: Draft<SliceState>): void => {
  let error = null;

  if (
    hasExistingPosition(state) &&
    state.userInput.notionalAmount.editMode === 'remove' &&
    state.userInput.notionalAmount.value > (state.selectedPosition as Position).notional
  ) {
    error = 'Not enough notional. Available notional:';
  }

  state.userInput.notionalAmount.error = error;
};
