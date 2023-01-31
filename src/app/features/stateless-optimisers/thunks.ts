import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllMellowProducts } from '@voltz-protocol/v1-sdk';
import { ethers } from 'ethers';

import { OptimiserInfo } from './types';

// TODO: enrich this mapping
const mapRouter = (r: Awaited<ReturnType<typeof getAllMellowProducts>>[0]): OptimiserInfo => r;

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
  }
>('stateless-optimisers/getProducts', async ({ signer, type }, thunkAPI) => {
  try {
    const routers = await getAllMellowProducts(signer, type);

    const mappedRouters: OptimiserInfo[] = routers.map(mapRouter);

    return mappedRouters;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});


