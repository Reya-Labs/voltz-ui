import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAMMs, getChainLevelInformation, SupportedChainId } from '@voltz-protocol/v1-sdk';

import { getAlchemyKeyForChain } from '../../../utilities/network/get-alchemy-key-for-chain';
import { rejectThunkWithError } from '../helpers/reject-thunk-with-error';

export const initialiseAMMsThunk = createAsyncThunk<
  Awaited<ReturnType<typeof getAMMs> | ReturnType<typeof rejectThunkWithError>>,
  {
    chainId: SupportedChainId;
  }
>('aMMs/initialiseAMMs', async ({ chainId }, thunkAPI) => {
  try {
    const { amms, error } = await getAMMs({
      chainId,
      alchemyApiKey: getAlchemyKeyForChain(chainId),
    });
    if (error) {
      return rejectThunkWithError(thunkAPI, error);
    }
    return amms;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

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
