import { createAsyncThunk } from '@reduxjs/toolkit';
import { depositMargin } from '@voltz-protocol/sdk-v2';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers';

export type ReturnTypeDepositMargin = Awaited<ReturnType<typeof depositMargin>>;

export const depositMarginFromMarginAccountThunk = createAsyncThunk<
  Awaited<ReturnTypeDepositMargin | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('portfolio/depositMarginFromMarginAccountThunk', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const depositMarginFlow = state.portfolio.marginAccountDepositMarginFlow;
    const selectedMarginAccount = depositMarginFlow.selectedMarginAccount;
    const userInput = depositMarginFlow.userInput;
    if (!selectedMarginAccount || !userInput.token) {
      return;
    }
    return await depositMargin({
      marginAccountId: selectedMarginAccount.id,
      amount: userInput.amount,
      token: userInput.token,
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
