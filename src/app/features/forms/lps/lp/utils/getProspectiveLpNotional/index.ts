import { Draft } from '@reduxjs/toolkit';

import { isUserInputNotionalError } from '../../../../common/utils';
import { SliceState } from '../../state';

export const getProspectiveLpNotional = (state: Draft<SliceState>): number => {
  if (isUserInputNotionalError(state)) {
    return 0;
  }

  if (state.userInput.notionalAmount.editMode === 'add') {
    return state.userInput.notionalAmount.value;
  }

  return -state.userInput.notionalAmount.value;
};
