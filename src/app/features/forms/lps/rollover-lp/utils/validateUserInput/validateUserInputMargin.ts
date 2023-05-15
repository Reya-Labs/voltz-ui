import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';
import { getAvailableMargin } from '../getAvailableMargin';

export const validateUserInputMargin = (state: Draft<SliceState>): void => {
  const availableMargin = getAvailableMargin(state);
  let error = null;
  if (availableMargin !== null && state.userInput.marginAmount.value > availableMargin) {
    error = 'WLT';
  }

  if (
    state.prospectiveLp.infoPostLp.status === 'success' &&
    state.userInput.marginAmount.value < state.prospectiveLp.infoPostLp.value.marginRequirement
  ) {
    error = 'Margin too low. Additional margin required:';
  }

  state.userInput.marginAmount.error = error;
};
