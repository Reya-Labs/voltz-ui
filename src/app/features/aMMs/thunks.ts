import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAMMs } from '@voltz-protocol/v1-sdk';

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
    return await getAMMs({
      network: process.env.REACT_APP_NETWORK || '',
      providerURL: process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK || '',
      subgraphURL: process.env.REACT_APP_SUBGRAPH_URL || '',
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
