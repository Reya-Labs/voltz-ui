import { createAsyncThunk } from '@reduxjs/toolkit';

import { rejectThunkWithError } from '../../../helpers';
import { fetchAllMarginAccounts } from '../../helpers';
import { PortfolioMarginAccount } from '../fetchMarginAccountsThunk';

export const fetchMarginAccountsForSelectionThunk = createAsyncThunk<
  Awaited<PortfolioMarginAccount[] | ReturnType<typeof rejectThunkWithError>>,
  {
    account: string;
  }
>('portfolio/fetchMarginAccountsForSelectionThunk', async ({ account }, thunkAPI) =>
  fetchAllMarginAccounts({
    account,
    thunkAPI,
  }),
);
