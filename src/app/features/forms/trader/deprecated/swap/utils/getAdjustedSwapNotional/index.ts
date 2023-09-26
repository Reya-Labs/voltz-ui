import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';
import { getExistingPositionMode } from '../getExistingPositionMode';
import { getExistingPositionNotional } from '../getExistingPositionNotional';

export const getAdjustedSwapNotional = (state: Draft<SliceState>): number => {
  const value = state.userInput.notionalAmount.value;

  const existingPositionNotional = getExistingPositionNotional(state);
  if (
    existingPositionNotional !== null &&
    state.userInput.mode !== getExistingPositionMode(state)
  ) {
    return state.userInput.notionalAmount.editMode === 'add'
      ? 2 * existingPositionNotional + value
      : 2 * existingPositionNotional - value;
  }

  return value;
};
