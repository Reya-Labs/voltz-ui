import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const hasExistingPosition = (state: Draft<SliceState>): boolean => {
  return state.selectedPosition !== null;
};
