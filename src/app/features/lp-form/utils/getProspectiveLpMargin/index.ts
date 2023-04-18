import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';
import { isUserInputMarginError } from '../isUserInputMarginError';

export const getProspectiveLpMargin = (state: Draft<SliceState>): number => {
  if (isUserInputMarginError(state)) {
    return 0;
  }

  if (state.userInput.marginAmount.editMode === 'add') {
    return state.userInput.marginAmount.value;
  }

  return -state.userInput.marginAmount.value;
};
