import { Draft } from '@reduxjs/toolkit';

import { SliceState as CashflowCalculatorState } from '../../../../cashflow-calculator/state';
import { SliceState as RolloverSwapFormState } from '../../state';
import { getEditPositionNotional } from '../getEditPositionNotional';

export const getEditPositionFixedRate = (
  cashflowCalculatorState: Draft<CashflowCalculatorState>,
  rolloverSwapFormState: Draft<RolloverSwapFormState>,
) => {
  if (cashflowCalculatorState.cashflowInfo.status === 'success') {
    if (getEditPositionNotional(rolloverSwapFormState) === 0) {
      return null;
    }

    return cashflowCalculatorState.cashflowInfo.averageFixedRate;
  }

  return null;
};
