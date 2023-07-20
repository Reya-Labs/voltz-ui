import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers';
import { approveUnderlyingTokenService } from '../../../../common';

export const approveUnderlyingTokenThunkHandler: AsyncThunkPayloadCreator<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().rolloverLpForm.amm;
    return await approveUnderlyingTokenService({
      amm: amm!,
      signer: amm!.signer!,
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const approveUnderlyingTokenThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('rolloverLpForm/approveUnderlyingToken', approveUnderlyingTokenThunkHandler);
