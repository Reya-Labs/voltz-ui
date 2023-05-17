import { Draft } from '@reduxjs/toolkit';

import { SliceState as CashflowCalculatorState } from '../../../../../cashflow-calculator/state';
import { SliceState as SwapFormState } from '../../state';
import { getEditPositionNotional } from '../getEditPositionNotional';

export const getEditPositionFixedRate = (
  cashflowCalculatorState: Draft<CashflowCalculatorState>,
  swapFormState: Draft<SwapFormState>,
) => {
  if (cashflowCalculatorState.cashflowInfo.status === 'success') {
    if (getEditPositionNotional(swapFormState) === 0) {
      return null;
    }

    return cashflowCalculatorState.cashflowInfo.averageFixedRate;
  }

  return null;
};
