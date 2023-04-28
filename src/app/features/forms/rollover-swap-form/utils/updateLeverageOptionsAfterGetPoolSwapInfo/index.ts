import { Draft } from '@reduxjs/toolkit';

import { formatNumber } from '../../../../../../utilities/number';
import { calculateLeverageOptions } from '../../../common/utils';
import { SliceState } from '../../state';
import { getProspectiveSwapMode } from '../getProspectiveSwapMode';

export const updateLeverageOptionsAfterGetPoolSwapInfo = (state: Draft<SliceState>): void => {
  const maxLeverage = formatNumber(
    Math.floor(state.poolSwapInfo.maxLeverage[getProspectiveSwapMode(state)]),
    0,
    0,
  );
  state.prospectiveSwap.leverage.maxLeverage = maxLeverage;
  state.prospectiveSwap.leverage.options = calculateLeverageOptions(maxLeverage);
};
