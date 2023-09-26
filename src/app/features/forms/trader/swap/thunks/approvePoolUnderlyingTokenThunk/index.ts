import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers';
import { approvePoolUnderlyingTokenService } from '../../../../common';

export const approvePoolUnderlyingTokenThunkHandler: AsyncThunkPayloadCreator<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const { pool, signer } = thunkAPI.getState().swapForm;
    if (!pool || !signer) {
      return;
    }
    return await approvePoolUnderlyingTokenService({
      poolId: pool.id,
      signer,
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const approvePoolUnderlyingTokenThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/approvePoolUnderlyingTokenThunk', approvePoolUnderlyingTokenThunkHandler);
