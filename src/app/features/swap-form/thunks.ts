import { createAsyncThunk } from '@reduxjs/toolkit';
import { InfoPostSwapV1 } from '@voltz-protocol/v1-sdk';

import { stringToBigFloat } from '../../../utilities/number';
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

    const variableRate = await amm.getInstantApy();
    return variableRate * 100;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const getAvailableNotionalsThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/getAvailableNotionals', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().swapForm.amm;
    if (!amm) {
      return;
    }

    const availableNotionals = await amm.getAvailableNotionals();
    return availableNotionals;
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

export const getInfoPostSwapThunk = createAsyncThunk<
  Awaited<
    | { notionalAmount: number; infoPostSwapV1: InfoPostSwapV1 }
    | ReturnType<typeof rejectThunkWithError>
  >,
  void,
  { state: RootState }
>('swapForm/getInfoPostSwap', async (_, thunkAPI) => {
  try {
    const swapFormState = thunkAPI.getState().swapForm;
    const amm = swapFormState.amm;
    if (!amm) {
      return;
    }

    const notionalAmount = stringToBigFloat(swapFormState.prospectiveSwap.notionalAmount.value);
    const infoPostSwapV1 = await amm.getInfoPostSwapV1({
      isFT: swapFormState.prospectiveSwap.mode === 'fixed',
      notional: notionalAmount,
      fixedLow: 1,
      fixedHigh: 999,
    });

    return {
      notionalAmount,
      infoPostSwap: infoPostSwapV1,
    };
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
