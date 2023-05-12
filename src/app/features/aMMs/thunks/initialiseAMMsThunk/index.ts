import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAMMs } from '@voltz-protocol/v1-sdk';

import { getAlchemyKeyForChain } from '../../../../../utilities/network/get-alchemy-key-for-chain';
import { getAllowedChainIds } from '../../../../../utilities/network/get-allowed-chain-ids';
import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';

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
      alchemyApiKey: getAlchemyKeyForChain(chainIds[0]),
    });
    if (error) {
      return rejectThunkWithError(thunkAPI, error);
    }
    return amms;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
