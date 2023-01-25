import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllMellowProducts } from '@voltz-protocol/v1-sdk';

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
  void
>('stateless-optimisers/getProducts', async (_, thunkAPI) => {
  try {
    const routers = await getAllMellowProducts();

    // TODO: enrich this mapping
    const mappedRouters: OptimiserInfo[] = routers.map((r) => ({...r}));

    return mappedRouters;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
