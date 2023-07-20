import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const getDefaultLpFixedLow = (state: Draft<SliceState>): number => {
  // TODO: Artur layer in smarter dynamic default range logic in here
  return 1;
};
