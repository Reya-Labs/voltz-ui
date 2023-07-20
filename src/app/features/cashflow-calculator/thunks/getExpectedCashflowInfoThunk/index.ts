import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExpectedCashflowInfo, Position } from '@voltz-protocol/v1-sdk';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers';

export const getExpectedCashflowInfoThunk = createAsyncThunk<
  Awaited<ExpectedCashflowInfo | ReturnType<typeof rejectThunkWithError>>,
  {
    position: Position | null;
    averageFixedRate: number;
    variableTokenDeltaBalance: number;
  },
  { state: RootState }
>(
  'swapForm/getExpectedCashflowInfo',
  async ({ position, averageFixedRate, variableTokenDeltaBalance }, thunkAPI) => {
    try {
      const state = thunkAPI.getState().cashflowCalculator;
      const amm = state.aMM;
      if (!amm) {
        return;
      }

      return await amm.getExpectedCashflowInfo({
        position: position ?? undefined,
        prospectiveSwapAvgFixedRate: averageFixedRate / 100,
        prospectiveSwapNotional: variableTokenDeltaBalance,
      });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  },
);
