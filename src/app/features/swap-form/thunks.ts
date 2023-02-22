import { createAsyncThunk } from '@reduxjs/toolkit';
import { AMM } from '@voltz-protocol/v1-sdk';

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

export const initialiseCashflowCalculator = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  {
    amm: AMM;
  }
>('aMMs/initialiseCasfhlowCalculator', async ({ amm }, thunkAPI) => {
  try {
    const { scaled: variableFactor } = await amm.variableFactor(
      amm.termStartTimestampInMS,
      Date.now(),
    );

    return variableFactor;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
