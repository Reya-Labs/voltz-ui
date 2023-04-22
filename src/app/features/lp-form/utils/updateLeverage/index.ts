import { Draft } from '@reduxjs/toolkit';

import { checkLowLeverageNotification } from '../../../common-form/utils';
import { SliceState } from '../../reducer';
import { getProspectiveLpNotional } from '../getProspectiveLpNotional';

export const updateLeverage = (state: Draft<SliceState>): void => {
  const prospectiveLpNotional = getProspectiveLpNotional(state);
  const marginAmount = state.userInput.marginAmount.value;
  const hasPositiveNotionalAndMargin = prospectiveLpNotional > 0 && marginAmount > 0;

  state.userInput.leverage = hasPositiveNotionalAndMargin
    ? prospectiveLpNotional / marginAmount
    : 0;
  state.showLowLeverageNotification = checkLowLeverageNotification(state);
};
