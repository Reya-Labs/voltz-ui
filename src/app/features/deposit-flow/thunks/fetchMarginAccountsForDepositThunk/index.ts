import { createAsyncThunk } from '@reduxjs/toolkit';

import { rejectThunkWithError } from '../../../helpers';
import { PortfolioMarginAccount } from '../../../portfolio';
import { fetchAllMarginAccounts } from '../../../portfolio/helpers';

export const fetchMarginAccountsForDepositThunk = createAsyncThunk<
  Awaited<PortfolioMarginAccount[] | ReturnType<typeof rejectThunkWithError>>,
  {
    account: string;
  }
>('portfolio/fetchMarginAccountsForDepositThunk', async ({ account }, thunkAPI) =>
  fetchAllMarginAccounts({
    account,
    thunkAPI,
  }),
);
