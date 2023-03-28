import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';
import { getExistingPositionMode } from '../getExistingPositionMode';

export const getProspectiveSwapMode = (state: Draft<SliceState>): 'fixed' | 'variable' => {
  if (state.position.value === null) {
    return state.userInput.mode;
  }

  const existingPositionMode = getExistingPositionMode(state);

  if (
    existingPositionMode === 'fixed' &&
    state.userInput.mode === 'fixed' &&
    state.userInput.notionalAmount.editMode === 'add'
  ) {
    return 'fixed';
  }

  if (
    existingPositionMode === 'variable' &&
    state.userInput.mode === 'variable' &&
    state.userInput.notionalAmount.editMode === 'add'
  ) {
    return 'variable';
  }

  return existingPositionMode === 'fixed' ? 'variable' : 'fixed';
};
