import { Draft } from '@reduxjs/toolkit';

import { checkLowLeverageNotification } from '../../../common-form/utils';
import { SliceState } from '../../reducer';
import { getProspectiveLpNotional } from '../getProspectiveLpNotional';

export const updateLeverage = (state: Draft<SliceState>): void => {
  if (getProspectiveLpNotional(state) > 0 && state.userInput.marginAmount.value > 0) {
    state.userInput.leverage = getProspectiveLpNotional(state) / state.userInput.marginAmount.value;
  }

  state.showLowLeverageNotification = checkLowLeverageNotification(state);
};
