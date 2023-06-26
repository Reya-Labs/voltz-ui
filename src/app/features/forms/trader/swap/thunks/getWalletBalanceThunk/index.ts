import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import { getWalletBalanceService } from '../../../../common/services/getWalletBalanceService';

export const getWalletBalanceThunkHandler: AsyncThunkPayloadCreator<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().swapForm.amm;
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
>('swapForm/getWalletBalance', getWalletBalanceThunkHandler);
