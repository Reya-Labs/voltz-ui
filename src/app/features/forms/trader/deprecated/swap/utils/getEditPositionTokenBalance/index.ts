import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../state';

export const getEditPositionTokenBalance = (state: Draft<SliceState>) => {
  let variableTokenBalance = 0;

  if (state.position.status === 'success' && state.position.value) {
    variableTokenBalance += state.position.value.variableTokenBalance;
  }

  if (state.prospectiveSwap.infoPostSwap.status === 'success') {
    variableTokenBalance += state.prospectiveSwap.infoPostSwap.value.variableTokenDeltaBalance;
  }

  return {
    variableTokenBalance,
  };
};
