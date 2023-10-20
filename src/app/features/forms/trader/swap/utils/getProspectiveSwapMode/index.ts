import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../types';

export const getProspectiveSwapMode = (state: Draft<SliceState>): 'fixed' | 'variable' => {
  return state.userInput.mode;
};
