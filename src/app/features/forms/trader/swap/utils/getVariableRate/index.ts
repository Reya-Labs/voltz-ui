import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../types';

export const getVariableRate = (state: Draft<SliceState>) => {
  return state.pool ? state.pool.currentVariableRate : null;
};
