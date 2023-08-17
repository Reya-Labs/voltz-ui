import { createAsyncThunk } from '@reduxjs/toolkit';
import { withdrawMargin } from '@voltz-protocol/sdk-v2';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers';

export type ReturnTypeWithdrawMargin = Awaited<ReturnType<typeof withdrawMargin>>;

export const withdrawMarginFromMarginAccountThunk = createAsyncThunk<
  Awaited<ReturnTypeWithdrawMargin | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('portfolio/withdrawMarginFromMarginAccountThunk', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const withdrawMarginFlow = state.portfolio.marginAccountWithdrawMarginFlow;
    const selectedMarginAccount = withdrawMarginFlow.selectedMarginAccount;
    const userInput = withdrawMarginFlow.userInput;
    if (!selectedMarginAccount || !userInput.token) {
      return;
    }
    return await withdrawMargin({
      marginAccountId: selectedMarginAccount.id,
      amount: userInput.amount,
      token: userInput.token,
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
