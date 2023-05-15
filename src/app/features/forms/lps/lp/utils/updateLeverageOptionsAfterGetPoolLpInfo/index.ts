import { Draft } from '@reduxjs/toolkit';

import { formatNumber } from '../../../../../../../utilities/number';
import { calculateLeverageOptions } from '../../../../common/utils';
import { SliceState } from '../../state';

export const updateLeverageOptionsAfterGetPoolLpInfo = (state: Draft<SliceState>): void => {
  const maxLeverage = formatNumber(Math.floor(state.poolLpInfo.maxLeverage), 0, 0);
  state.prospectiveLp.leverage.maxLeverage = maxLeverage;
  state.prospectiveLp.leverage.options = calculateLeverageOptions(maxLeverage);
};
