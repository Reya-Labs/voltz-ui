import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const getDefaultLpFixedLow = (state: Draft<SliceState>): number => {
  // todo: layer in smarter dynamic default range logic in here
  return 1;
};
