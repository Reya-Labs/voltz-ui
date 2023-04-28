import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';
import { getExistingPositionMode } from '../getExistingPositionMode';

export const getProspectiveSwapMode = (state: Draft<SliceState>): 'fixed' | 'variable' => {
  const existingPositionMode = getExistingPositionMode(state);

  if (state.position.value === null) {
    return state.userInput.mode;
  }

  if (
    existingPositionMode === state.userInput.mode &&
    state.userInput.notionalAmount.editMode === 'add'
  ) {
    return existingPositionMode;
  }

  return existingPositionMode === 'fixed' ? 'variable' : 'fixed';
};
