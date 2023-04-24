import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const hasExistingPosition = (state: Draft<SliceState>): boolean => {
  return state.position.status === 'success' && state.position.value !== null;
};
