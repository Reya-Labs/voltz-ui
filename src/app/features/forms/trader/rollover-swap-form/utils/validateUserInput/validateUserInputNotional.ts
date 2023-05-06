import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';
import { getAvailableNotional } from '../getAvailableNotional';
import { getProspectiveSwapNotional } from '../getProspectiveSwapNotional';

export const validateUserInputNotional = (state: Draft<SliceState>): void => {
  let error = null;
  if (getProspectiveSwapNotional(state) > getAvailableNotional(state)) {
    error = 'Not enough liquidity. Available:';
  }

  state.userInput.notionalAmount.error = error;
};
