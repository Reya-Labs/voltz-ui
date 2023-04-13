import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';
import { getAvailableMargin } from '../getAvailableMargin';
import { hasExistingPosition } from '../hasExistingPosition';

export const validateUserInputMargin = (state: Draft<SliceState>): void => {
  const availableMargin = getAvailableMargin(state);
  const existingPosition = hasExistingPosition(state);
  let error = null;
  if (
    state.userInput.marginAmount.editMode === 'add' &&
    availableMargin !== null &&
    state.userInput.marginAmount.value > availableMargin
  ) {
    error = 'WLT';
  }

  if (
    state.userInput.marginAmount.editMode === 'add' &&
    state.prospectiveSwap.infoPostSwap.status === 'success' &&
    state.userInput.marginAmount.value < state.prospectiveSwap.infoPostSwap.value.marginRequirement
  ) {
    error = 'Margin too low. Additional margin required:';
  }

  if (
    existingPosition &&
    state.userInput.marginAmount.editMode === 'remove' &&
    availableMargin !== null &&
    state.userInput.marginAmount.value > availableMargin
  ) {
    error = 'Not enough margin. Available margin:';
  }

  if (
    existingPosition &&
    state.userInput.marginAmount.editMode === 'remove' &&
    state.prospectiveSwap.infoPostSwap.status === 'success' &&
    state.prospectiveSwap.infoPostSwap.value.marginRequirement > 0
  ) {
    error = 'You must add margin. Available margin:';
  }

  state.userInput.marginAmount.error = error;
};
