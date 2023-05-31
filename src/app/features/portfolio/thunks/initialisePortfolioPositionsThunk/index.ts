import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPortfolioPositions, PortfolioPosition } from '@voltz-protocol/v1-sdk';

import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';
import { getAllowedChainIds } from '../../../network';

export const initialisePortfolioPositionsThunk = createAsyncThunk<
  Awaited<PortfolioPosition[] | ReturnType<typeof rejectThunkWithError>>,
  {
    account: string;
  }
>('portfolio/initialisePortfolioPositions', async ({ account }, thunkAPI) => {
  try {
    if (!account) {
      return [];
    }
    const chainIds = getAllowedChainIds();
    if (chainIds.length === 0) {
      return [];
    }
    return await getPortfolioPositions(chainIds, account.toLowerCase());
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
