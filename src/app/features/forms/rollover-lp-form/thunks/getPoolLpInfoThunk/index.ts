import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../../../../store';
import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';
import { getDefaultLpFixedHigh, getDefaultLpFixedLow } from '../../utils';

export const getPoolLpInfoThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('rolloverLpForm/getPoolLpInfo', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState().rolloverLpForm;
    const amm = state.amm;
    const previousAmm = state.previousAMM;
    const previousPosition = state.previousPosition;
    if (!amm || !previousAmm || !previousPosition) {
      return;
    }

    return await amm.getPoolLpInfo(getDefaultLpFixedLow(state), getDefaultLpFixedHigh(state));
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
