import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllMellowProducts, SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';
import { ethers } from 'ethers';

import { OptimiserInfo } from './types';

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

export const initialiseOptimisersThunk = createAsyncThunk<
  OptimiserInfo | Awaited<ReturnType<typeof rejectThunkWithError>>,
  {
    signer: ethers.Signer | null;
    type: 'active' | 'all';
    network: SupportedNetworksEnum;
  }
>('stateless-optimisers/getProducts', async ({ signer, type }, thunkAPI) => {
  try {
    const mappedRouters: OptimiserInfo[] = await getAllMellowProducts(signer, type);
    return mappedRouters;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
