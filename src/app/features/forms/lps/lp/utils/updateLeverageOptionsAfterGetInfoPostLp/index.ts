import { Draft } from '@reduxjs/toolkit';

import { formatNumber } from '../../../../../../../utilities/number';
import { calculateLeverageOptions } from '../../../../common/utils';
import { SliceState } from '../../state';
import { getProspectiveLpNotional } from '../getProspectiveLpNotional';

export const updateLeverageOptionsAfterGetInfoPostLp = (state: Draft<SliceState>): void => {
  let maxLeverage = '--';
  if (
    !state.userInput.notionalAmount.error &&
    state.prospectiveLp.infoPostLp.status === 'success'
  ) {
    if (state.prospectiveLp.infoPostLp.value.marginRequirement > 0) {
      maxLeverage = formatNumber(
        Math.floor(
          getProspectiveLpNotional(state) / state.prospectiveLp.infoPostLp.value.marginRequirement,
        ),
        0,
        0,
      );
    } else {
      maxLeverage = formatNumber(Math.floor(state.poolLpInfo.maxLeverage), 0, 0);
    }
  }

  state.prospectiveLp.leverage.maxLeverage = maxLeverage;
  state.prospectiveLp.leverage.options = calculateLeverageOptions(maxLeverage);
};
