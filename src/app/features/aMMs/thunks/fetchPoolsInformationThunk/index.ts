import { createAsyncThunk } from '@reduxjs/toolkit';
import { getChainLevelInformation } from '@voltz-protocol/v1-sdk';

import { rejectThunkWithError } from '../../../helpers';
import { getAllowedChainIds } from '../../../network/';

export const fetchPoolsInformationThunk = createAsyncThunk<
  Awaited<ReturnType<typeof getChainLevelInformation> | ReturnType<typeof rejectThunkWithError>>,
  void
>('aMMs/fetchPoolsInformation', async (_, thunkAPI) => {
  try {
    const chainIds = getAllowedChainIds();
    return await getChainLevelInformation(chainIds);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
