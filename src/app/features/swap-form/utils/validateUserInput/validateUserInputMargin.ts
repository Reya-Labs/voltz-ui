import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';
import { getAvailableMargin } from '../getAvailableMargin';

export const validateUserInputMargin = (state: Draft<SliceState>): void => {
  const availableMargin = getAvailableMargin(state);
  const hasMargin = availableMargin !== null;
  const hasSwap = state.prospectiveSwap.infoPostSwap.status === 'success';
  const { editMode, value: marginValue } = state.userInput.marginAmount;
  const { marginRequirement } = state.prospectiveSwap.infoPostSwap.value;
  let error = null;

  if (editMode === 'add') {
    if (hasMargin && marginValue > availableMargin) {
      error = 'WLT';
    } else if (hasSwap && marginValue < marginRequirement) {
      error = 'Margin too low. Additional margin required:';
    }
  }

  if (editMode === 'remove') {
    if (hasMargin && marginValue > availableMargin) {
      error = 'Not enough margin. Available margin:';
    } else if (hasSwap && marginRequirement > 0 && marginValue === 0) {
      error = 'You must add margin. Available margin:';
    }
  }

  state.userInput.marginAmount.error = error;
};
