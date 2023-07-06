import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers';
import { getWalletBalanceService } from '../../../../common';

export const getWalletBalanceThunkHandler: AsyncThunkPayloadCreator<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().lpForm.amm;
    return await getWalletBalanceService({
      amm: amm!,
      signer: amm!.signer!,
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const getWalletBalanceThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('lpForm/getWalletBalance', getWalletBalanceThunkHandler);
