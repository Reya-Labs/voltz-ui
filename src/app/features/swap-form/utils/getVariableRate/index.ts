import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const getVariableRate = (state: Draft<SliceState>) => {
  return state.variableRate.status === 'success' ? state.variableRate.value : null;
};
