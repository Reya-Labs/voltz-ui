import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const getDefaultLpFixedHigh = (state: Draft<SliceState>): number => {
  // todo: Artur layer in smarter dynamic default range logic in here
  return 3;
};
