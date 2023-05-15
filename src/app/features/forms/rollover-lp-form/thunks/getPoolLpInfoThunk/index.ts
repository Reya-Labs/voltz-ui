import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../../../../store';
import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';
import {
  getDefaultLpFixedHigh,
  getDefaultLpFixedLow,
  getProspectiveLpFixedHigh,
  getProspectiveLpFixedLow,
} from '../../utils';

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

    let fixedLow: number | null = getProspectiveLpFixedLow(state);
    let fixedHigh: number | null = getProspectiveLpFixedHigh(state);

    if (fixedLow === null || fixedHigh === null) {
      fixedLow = getDefaultLpFixedLow(state);
      fixedHigh = getDefaultLpFixedHigh(state);
    }

    return await amm.getPoolLpInfo(fixedLow, fixedHigh);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
