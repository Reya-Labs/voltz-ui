import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const checkLowLeverageNotification = (state: Draft<SliceState>) => {
  return !!(
    state.amm &&
    state.userInput.leverage !== null &&
    state.userInput.leverage < state.amm.minLeverageAllowed &&
    !state.showLowLeverageNotification
  );
};
