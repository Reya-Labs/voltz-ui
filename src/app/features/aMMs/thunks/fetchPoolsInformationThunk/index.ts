import { createAsyncThunk } from '@reduxjs/toolkit';
import { getChainLevelInformation, SupportedChainId } from '@voltz-protocol/v1-sdk';

import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';

export const fetchPoolsInformationThunk = createAsyncThunk<
  Awaited<ReturnType<typeof getChainLevelInformation> | ReturnType<typeof rejectThunkWithError>>,
  {
    chainId: SupportedChainId;
  }
>('aMMs/fetchPoolsInformation', async ({ chainId }, thunkAPI) => {
  try {
    return await getChainLevelInformation(chainId);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
