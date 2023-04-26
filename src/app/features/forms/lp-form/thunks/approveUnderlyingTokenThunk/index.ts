import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../../../../store';
import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';

export const approveUnderlyingTokenThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('lpForm/approveUnderlyingToken', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().lpForm.amm;
    if (!amm || !amm.signer) {
      return;
    }

    return await amm.approveUnderlyingTokenForPeripheryV1();
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
