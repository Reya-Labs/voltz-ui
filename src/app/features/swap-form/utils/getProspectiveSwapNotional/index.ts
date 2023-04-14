import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';
import { getExistingPositionMode } from '../getExistingPositionMode';
import { getExistingPositionNotional } from '../getExistingPositionNotional';
import { isUserInputNotionalError } from '../isUserInputNotionalError';

export const getProspectiveSwapNotional = (state: Draft<SliceState>): number => {
  if (isUserInputNotionalError(state)) {
    return 0;
  }

  let value = state.userInput.notionalAmount.value;

  const existingPositionNotional = getExistingPositionNotional(state);
  if (
    state.position.value !== null &&
    existingPositionNotional !== null &&
    state.userInput.mode !== getExistingPositionMode(state)
  ) {
    value =
      state.userInput.notionalAmount.editMode === 'add'
        ? 2 * existingPositionNotional + value
        : 2 * existingPositionNotional - value;
  }

  return value;
};
