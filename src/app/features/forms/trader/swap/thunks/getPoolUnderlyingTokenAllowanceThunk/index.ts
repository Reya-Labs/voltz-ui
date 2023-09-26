import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers';
import { getPoolUnderlyingTokenAllowanceService } from '../../../../common';

export const getPoolUnderlyingTokenAllowanceThunkHandler: AsyncThunkPayloadCreator<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const { pool, signer } = thunkAPI.getState().swapForm;
    if (!pool || !signer) {
      return 0;
    }
    return await getPoolUnderlyingTokenAllowanceService({
      poolId: pool.id,
      signer,
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};
export const getPoolUnderlyingTokenAllowanceThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/getPoolUnderlyingTokenAllowanceThunk', getPoolUnderlyingTokenAllowanceThunkHandler);
