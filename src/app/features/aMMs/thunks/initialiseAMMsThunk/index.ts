import { createAsyncThunk } from '@reduxjs/toolkit';
import { getV1V2AMMs } from '@voltz-protocol/v1-sdk';

import { getAlchemyKey } from '../../../../../utilities/getAlchemyKey';
import { getInfuraKey } from '../../../../../utilities/getInfuraKey';
import { rejectThunkWithError } from '../../../helpers';
import { getAllowedChainIds } from '../../../network/';

export const initialiseAMMsThunk = createAsyncThunk<
  Awaited<ReturnType<typeof getV1V2AMMs> | ReturnType<typeof rejectThunkWithError>>,
  void
>('aMMs/initialiseAMMs', async (_, thunkAPI) => {
  const chainIds = getAllowedChainIds();
  if (chainIds.length === 0) {
    return [];
  }

  try {
    const { amms, error } = await getV1V2AMMs({
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
