import { Draft } from '@reduxjs/toolkit';

import { isUserInputNotionalError } from '../../../common/utils';
import { SliceState } from '../../state';

export const getProspectiveSwapNotional = (state: Draft<SliceState>): number => {
  if (isUserInputNotionalError(state)) {
    return 0;
  }

  return state.userInput.notionalAmount.value;
};
