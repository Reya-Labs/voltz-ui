import { Draft } from '@reduxjs/toolkit';

import { isUserInputNotionalError } from '../../../../common';
import { SliceState } from '../../state';

export const getProspectiveLpNotional = (state: Draft<SliceState>): number => {
  if (isUserInputNotionalError(state)) {
    return 0;
  }

  return state.userInput.notionalAmount.value;
};
