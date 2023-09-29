import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const getAvailableNotional = (state: Draft<SliceState>): number => {
  if (state.maxNotionalAvailable.status !== 'success') {
    return 0;
  }
  return state.maxNotionalAvailable.value;
};
