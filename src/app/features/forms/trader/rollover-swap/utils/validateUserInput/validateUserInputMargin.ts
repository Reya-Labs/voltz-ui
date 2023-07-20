import { Draft } from '@reduxjs/toolkit';

import { isUserInputNotionalError } from '../../../../common';
import { SliceState } from '../../state';
import { getAvailableMargin } from '../getAvailableMargin';

export const validateUserInputMargin = (state: Draft<SliceState>): void => {
  const availableMargin = getAvailableMargin(state);
  const hasMargin = availableMargin !== null;
  const hasSwap = state.prospectiveSwap.infoPostSwap.status === 'success';
  const { value: marginValue } = state.userInput.marginAmount;
  const { marginRequirement } = state.prospectiveSwap.infoPostSwap.value;
  let error = null;
  if (!isUserInputNotionalError(state)) {
    if (hasMargin && marginValue > availableMargin) {
      error = 'WLT';
    } else if (hasSwap && marginValue < marginRequirement) {
      error = 'Margin too low. Additional margin required:';
    }
  }

  state.userInput.marginAmount.error = error;
};
