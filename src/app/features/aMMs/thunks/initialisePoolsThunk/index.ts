import { createAsyncThunk } from '@reduxjs/toolkit';
import { getV2Pools } from '@voltz-protocol/api-sdk-v2';

import { rejectThunkWithError } from '../../../helpers';
import { getAllowedChainIds } from '../../../network/';

type V2Pools = Awaited<ReturnType<typeof getV2Pools>>;
export type V2Pool = V2Pools[0];

export const initialisePoolsThunk = createAsyncThunk<
  Awaited<ReturnType<typeof getV2Pools> | ReturnType<typeof rejectThunkWithError>>,
  void
>('aMMs/initialisePoolsThunk', async (_, thunkAPI) => {
  const chainIds = getAllowedChainIds();
  if (chainIds.length === 0) {
    return [];
  }

  try {
    return await getV2Pools({
      chainIds,
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
