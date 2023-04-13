import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';
import { getEditPositionTokenBalance } from '../getEditPositionTokenBalance';

export const getEditPositionNotional = (state: Draft<SliceState>) => {
  const { variableTokenBalance: notional } = getEditPositionTokenBalance(state);
  return Math.abs(notional);
};
