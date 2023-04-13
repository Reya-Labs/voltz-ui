import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';
import { checkLowLeverageNotification } from '../checkLowLeverageNotification';
import { getProspectiveSwapNotional } from '../getProspectiveSwapNotional';

export const updateLeverage = (state: Draft<SliceState>): void => {
  if (getProspectiveSwapNotional(state) > 0 && state.userInput.marginAmount.value > 0) {
    state.userInput.leverage =
      getProspectiveSwapNotional(state) / state.userInput.marginAmount.value;
  }

  state.showLowLeverageNotification = checkLowLeverageNotification(state);
};
