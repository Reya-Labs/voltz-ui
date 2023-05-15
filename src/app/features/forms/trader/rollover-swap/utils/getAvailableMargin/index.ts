import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

// todo: FB same as in rollover swap/lp form
export const getAvailableMargin = (state: Draft<SliceState>): number | null => {
  const { walletBalance, previousPosition } = state;
  if (walletBalance.status !== 'success' || previousPosition === null) {
    return null;
  }

  return walletBalance.value + previousPosition.settlementCashflow;
};
