import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { PoolSwapInfo } from '@voltz-protocol/v1-sdk';

import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';

export const getPoolSwapInfoThunkHandler: AsyncThunkPayloadCreator<
  Awaited<PoolSwapInfo | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().swapForm.amm;
    if (!amm) {
      return;
    }
    // TODO: This should be removed once we have pools data coming from indexers
    return await amm.getPoolSwapInfo();
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const getPoolSwapInfoThunk = createAsyncThunk<
  Awaited<PoolSwapInfo | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/getPoolSwapInfo', getPoolSwapInfoThunkHandler);
