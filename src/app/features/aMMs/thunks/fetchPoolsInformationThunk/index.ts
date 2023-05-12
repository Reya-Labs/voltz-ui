import { createAsyncThunk } from '@reduxjs/toolkit';
import { getChainLevelInformation } from '@voltz-protocol/v1-sdk';

import { getAllowedChainIds } from '../../../../../utilities/network/get-allowed-chain-ids';
import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';

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
