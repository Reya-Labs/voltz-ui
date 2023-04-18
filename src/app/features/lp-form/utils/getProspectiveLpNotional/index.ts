import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';
import { isUserInputNotionalError } from '../isUserInputNotionalError';

export const getProspectiveLpNotional = (state: Draft<SliceState>): number => {
  if (isUserInputNotionalError(state)) {
    return 0;
  }

  if (state.userInput.notionalAmount.editMode === 'add') {
    return state.userInput.notionalAmount.value;
  }

  return -state.userInput.notionalAmount.value;
};
