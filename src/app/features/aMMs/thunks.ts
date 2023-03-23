import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAMMs, SupportedChainId } from '@voltz-protocol/v1-sdk';

import { getAlchemyKeyForChain } from '../../../utilities/network/get-alchemy-key-for-chain';

const rejectThunkWithError = (
  thunkAPI: {
    rejectWithValue: (value: string | undefined) => unknown;
  },
  err: unknown,
) => {
  if (typeof err === 'string') {
    return thunkAPI.rejectWithValue(err);
  }
  return thunkAPI.rejectWithValue((err as Error)?.message);
};

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
