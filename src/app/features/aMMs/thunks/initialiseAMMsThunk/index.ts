import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAMMs } from '@voltz-protocol/v1-sdk';

import { getAlchemyKey } from '../../../../../utilities/getAlchemyKey';
import { getInfuraKey } from '../../../../../utilities/getInfuraKey';
import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';
import { getAllowedChainIds } from '../../../network/';

export const initialiseAMMsThunk = createAsyncThunk<
  Awaited<ReturnType<typeof getAMMs> | ReturnType<typeof rejectThunkWithError>>,
  void
>('aMMs/initialiseAMMs', async (_, thunkAPI) => {
  const chainIds = getAllowedChainIds();
  if (chainIds.length === 0) {
    return [];
  }

  try {
    const { amms, error } = await getAMMs({
      chainIds,
      alchemyApiKey: getAlchemyKey(),
      infuraApiKey: getInfuraKey(),
    });
    if (error) {
      return rejectThunkWithError(thunkAPI, error);
    }
    return amms;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
