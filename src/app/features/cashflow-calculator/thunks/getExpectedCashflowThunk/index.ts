import { createAsyncThunk } from '@reduxjs/toolkit';
import { getExpectedCashflow, GetExpectedCashflowResult } from '@voltz-protocol/sdk-v2';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers';

export const getExpectedCashflowThunk = createAsyncThunk<
  Awaited<GetExpectedCashflowResult | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('cashflowCalculator/getExpectedCashflowThunk', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState().cashflowCalculator;
    const pool = state.pool;
    if (!pool) {
      return;
    }

    return await getExpectedCashflow({
      poolId: pool.id,
      estimatedVariableApy: state.estimatedVariableApy,
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
