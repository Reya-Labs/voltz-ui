import { createAsyncThunk } from '@reduxjs/toolkit';
import { simulateDepositMargin, SimulateDepositMarginArgs } from '@voltz-protocol/sdk-v2';

import { rejectThunkWithError } from '../../../helpers';

export type ReturnTypeSimulateDepositMargin = Awaited<ReturnType<typeof simulateDepositMargin>>;

export const simulateDepositMarginFromMarginAccountThunk = createAsyncThunk<
  Awaited<ReturnTypeSimulateDepositMargin | ReturnType<typeof rejectThunkWithError>>,
  SimulateDepositMarginArgs
>(
  'portfolio/simulateDepositMarginFromMarginAccountThunk',
  async ({ marginAccountId, amount, token }, thunkAPI) => {
    try {
      return await simulateDepositMargin({
        marginAccountId,
        amount,
        token,
      });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  },
);
