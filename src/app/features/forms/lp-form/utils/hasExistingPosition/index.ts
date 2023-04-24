import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const hasExistingPosition = (state: Draft<SliceState>): boolean => {
  return state.selectedPosition !== null;
};
