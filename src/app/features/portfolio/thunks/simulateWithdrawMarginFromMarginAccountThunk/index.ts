import { createAsyncThunk } from '@reduxjs/toolkit';
import { simulateWithdrawMargin, SimulateWithdrawMarginArgs } from '@voltz-protocol/sdk-v2';

import { rejectThunkWithError } from '../../../helpers';

export type ReturnTypeSimulateWithdrawMargin = Awaited<ReturnType<typeof simulateWithdrawMargin>>;

export const simulateWithdrawMarginFromMarginAccountThunk = createAsyncThunk<
  Awaited<ReturnTypeSimulateWithdrawMargin | ReturnType<typeof rejectThunkWithError>>,
  SimulateWithdrawMarginArgs
>(
  'portfolio/simulateWithdrawMarginFromMarginAccountThunk',
  async ({ marginAccountId, amount, token }, thunkAPI) => {
    try {
      return await simulateWithdrawMargin({
        marginAccountId,
        amount,
        token,
      });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  },
);
