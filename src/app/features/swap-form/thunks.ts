import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../store';

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

export const getFixedRateThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/getFixedRate', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().swapForm.amm;
    if (!amm) {
      return;
    }

    const fixedRate = await amm.getFixedApr();
    return fixedRate;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const getVariableRateThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/getVariableRate', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().swapForm.amm;
    if (!amm) {
      return;
    }

    const fixedRate = await amm.getInstantApy();
    return fixedRate;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const initialiseCashflowCalculatorThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/initialiseCashFlowCalculator', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().swapForm.amm;
    if (!amm) {
      return;
    }
    const { scaled: variableFactor } = await amm.variableFactor(
      amm.termStartTimestampInMS,
      Date.now(),
    );

    return variableFactor;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
