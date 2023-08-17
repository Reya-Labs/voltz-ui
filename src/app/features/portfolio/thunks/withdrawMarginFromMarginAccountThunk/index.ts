import { createAsyncThunk } from '@reduxjs/toolkit';
import { withdrawMargin, WithdrawMarginArgs } from '@voltz-protocol/sdk-v2';

import { rejectThunkWithError } from '../../../helpers';

export type ReturnTypeWithdrawMargin = Awaited<ReturnType<typeof withdrawMargin>>;

export const withdrawMarginFromMarginAccountThunk = createAsyncThunk<
  Awaited<ReturnTypeWithdrawMargin | ReturnType<typeof rejectThunkWithError>>,
  WithdrawMarginArgs
>(
  'portfolio/withdrawMarginFromMarginAccountThunk',
  async ({ marginAccountId, amount, token }, thunkAPI) => {
    try {
      return await withdrawMargin({
        marginAccountId,
        amount,
        token,
      });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  },
);
