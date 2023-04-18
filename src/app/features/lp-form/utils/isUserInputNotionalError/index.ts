import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const isUserInputNotionalError = (state: Draft<SliceState>): boolean => {
  return state.userInput.notionalAmount.error !== null;
};
