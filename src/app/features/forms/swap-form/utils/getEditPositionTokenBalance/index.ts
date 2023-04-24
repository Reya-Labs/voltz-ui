import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';

export const getEditPositionTokenBalance = (state: Draft<SliceState>) => {
  let fixedTokenBalance = 0;
  let variableTokenBalance = 0;

  if (state.position.status === 'success' && state.position.value) {
    fixedTokenBalance += state.position.value.fixedTokenBalance;
    variableTokenBalance += state.position.value.variableTokenBalance;
  }

  if (state.prospectiveSwap.infoPostSwap.status === 'success') {
    fixedTokenBalance += state.prospectiveSwap.infoPostSwap.value.fixedTokenDeltaBalance;
    variableTokenBalance += state.prospectiveSwap.infoPostSwap.value.variableTokenDeltaBalance;
  }

  return {
    fixedTokenBalance,
    variableTokenBalance,
  };
};
