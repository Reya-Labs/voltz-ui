import { createAsyncThunk } from '@reduxjs/toolkit';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';

export type VoyageBadges = {
  timestamp: number | undefined;
};

export const fetchVoyageBadgesThunk = createAsyncThunk<
  Awaited<VoyageBadges[] | ReturnType<typeof rejectThunkWithError>>,
  {
    chainId: SupportedChainId;
    account: string;
  }
>('voyage/fetchBadges', async ({ account, chainId }, thunkAPI) => {
  try {
    const promise = new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
    await promise;
    return [
      {
        timestamp: Math.random() * 100 > 50 ? undefined : new Date().valueOf(),
      },
    ];
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
