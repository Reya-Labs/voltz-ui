import { createAsyncThunk } from '@reduxjs/toolkit';
import { getVoyages, SupportedChainId, Voyage } from '@voltz-protocol/v1-sdk';

import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';

export const fetchVoyageBadgesThunk = createAsyncThunk<
  Awaited<Voyage[] | ReturnType<typeof rejectThunkWithError>>,
  {
    chainId: SupportedChainId;
    account: string;
  }
>('voyage/fetchBadges', async ({ account, chainId }, thunkAPI) => {
  try {
    return await getVoyages({ chainId, account });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
