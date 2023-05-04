import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const getAvailableMargin = (state: Draft<SliceState>): number | null => {
  const { walletBalance } = state;

  return walletBalance.status === 'success' ? walletBalance.value : null;
};
