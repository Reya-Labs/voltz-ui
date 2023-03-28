import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const getExistingPositionMode = (state: Draft<SliceState>) => {
  if (state.position.status !== 'success' || !state.position.value) {
    return null;
  }

  return state.position.value.positionType === 1 ? 'fixed' : 'variable';
};
