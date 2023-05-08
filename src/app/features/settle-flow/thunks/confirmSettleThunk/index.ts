import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContractReceipt } from 'ethers';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';

export const confirmSettleThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('settleFlow/confirmSettle', async (_, thunkAPI) => {
  try {
    const position = thunkAPI.getState().settleFlow.position;
    const amm = position?.amm;
    if (!amm || !position) {
      return {};
    }

    return await amm.settlePosition({
      fixedLow: position.fixedRateLower.toNumber(),
      fixedHigh: position.fixedRateUpper.toNumber(),
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
