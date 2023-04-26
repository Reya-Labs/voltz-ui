import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../../../../store';
import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';

export const getPoolSwapInfoThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/getPoolSwapInfo', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().swapForm.amm;
    if (!amm) {
      return;
    }

    return await amm.getPoolSwapInfo();
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
