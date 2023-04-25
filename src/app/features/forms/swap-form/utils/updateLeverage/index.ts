import { Draft } from '@reduxjs/toolkit';

import { checkLowLeverageNotification } from '../../../common/utils';
import { SliceState } from '../../state';
import { getProspectiveSwapNotional } from '../getProspectiveSwapNotional';

export const updateLeverage = (state: Draft<SliceState>): void => {
  if (getProspectiveSwapNotional(state) > 0 && state.userInput.marginAmount.value > 0) {
    state.userInput.leverage =
      getProspectiveSwapNotional(state) / state.userInput.marginAmount.value;
  }

  state.showLowLeverageNotification = checkLowLeverageNotification(state);
};
