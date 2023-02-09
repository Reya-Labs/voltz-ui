import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAMMsV1 } from '@voltz-protocol/v1-sdk';

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
  Awaited<ReturnType<typeof getAMMsV1> | ReturnType<typeof rejectThunkWithError>>,
  void
>('aMMs/initialiseAMMs', async (_, thunkAPI) => {
  try {
    const { amms, error } = await getAMMsV1();
    if (error) {
      return rejectThunkWithError(thunkAPI, error);
    }
    return amms;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
