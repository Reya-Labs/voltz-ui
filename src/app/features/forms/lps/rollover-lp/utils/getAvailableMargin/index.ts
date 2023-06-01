import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const getAvailableMargin = (state: Draft<SliceState>): number | null => {
  const { walletBalance, previousPosition } = state;
  if (walletBalance.status !== 'success' || previousPosition === null) {
    return null;
  }

  return (
    walletBalance.value +
    previousPosition.settlementCashflow +
    previousPosition.margin +
    previousPosition.fees
  );
};
