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
    const amm = thunkAPI.getState().lpForm.amm;
    if (!amm) {
      return;
    }

    const lpFormState = thunkAPI.getState().lpForm;

    let fixedLow: number | null = getProspectiveLpFixedLow(lpFormState);
    let fixedHigh: number | null = getProspectiveLpFixedHigh(lpFormState);

    if (fixedLow === null || fixedHigh === null) {
      fixedLow = getDefaultLpFixedLow(lpFormState);
      fixedHigh = getDefaultLpFixedHigh(lpFormState);
    }

    return await amm.getPoolLpInfo(fixedLow, fixedHigh);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
