import { Draft } from '@reduxjs/toolkit';

import { formatNumber } from '../../../../../../../utilities/number';
import { calculateLeverageOptions } from '../../../../common/utils';
import { SliceState } from '../../state';
import { getProspectiveSwapMode } from '../getProspectiveSwapMode';
import { getProspectiveSwapNotional } from '../getProspectiveSwapNotional';

export const updateLeverageOptionsAfterGetInfoPostSwap = (state: Draft<SliceState>): void => {
  let maxLeverage = '--';
  if (
    !state.userInput.notionalAmount.error &&
    state.prospectiveSwap.infoPostSwap.status === 'success'
  ) {
    if (state.prospectiveSwap.infoPostSwap.value.marginRequirement > 0) {
      maxLeverage = formatNumber(
        Math.floor(
          getProspectiveSwapNotional(state) /
            state.prospectiveSwap.infoPostSwap.value.marginRequirement,
        ),
        0,
        0,
      );
    } else {
      maxLeverage = formatNumber(
        Math.floor(state.poolSwapInfo.maxLeverage[getProspectiveSwapMode(state)]),
        0,
        0,
      );
    }
  }

  state.prospectiveSwap.leverage.maxLeverage = maxLeverage;
  state.prospectiveSwap.leverage.options = calculateLeverageOptions(maxLeverage);
};
