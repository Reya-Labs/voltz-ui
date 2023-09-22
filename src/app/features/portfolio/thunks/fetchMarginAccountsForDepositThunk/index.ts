import { createAsyncThunk } from '@reduxjs/toolkit';

import { rejectThunkWithError } from '../../../helpers';
import { fetchAllMarginAccounts } from '../../helpers';
import { PortfolioMarginAccount } from '../fetchMarginAccountsThunk';

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
