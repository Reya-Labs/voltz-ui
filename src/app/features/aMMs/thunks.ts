import { createAsyncThunk } from '@reduxjs/toolkit';

import { getConfig } from '../../../hooks/voltz-config/config';
import { getAMMs } from './getAMMs';

const rejectThunkWithError = (
  thunkAPI: {
    rejectWithValue: (value: string | undefined) => unknown;
  },
  err: unknown,
) => {
  return thunkAPI.rejectWithValue((err as Error)?.message);
};

export const initialiseAMMsThunk = createAsyncThunk<
  Awaited<ReturnType<typeof getAMMs> | ReturnType<typeof rejectThunkWithError>>,
  void
>('aMMs/initialiseAMMs', async (_, thunkAPI) => {
  try {
    const config = getConfig();
    return await getAMMs(config.pools.map((p) => p.id.toLowerCase()));
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
