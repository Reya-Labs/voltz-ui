import { createAsyncThunk } from '@reduxjs/toolkit';
import { getChainLevelInformation, SupportedChainId } from '@voltz-protocol/v1-sdk';

import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';

export const fetchPoolsInformationThunk = createAsyncThunk<
  Awaited<ReturnType<typeof getChainLevelInformation> | ReturnType<typeof rejectThunkWithError>>,
  {
    chainIds: SupportedChainId[];
  }
>('aMMs/fetchPoolsInformation', async ({ chainIds }, thunkAPI) => {
  try {
    return await getChainLevelInformation(chainIds);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
