import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContractReceipt } from 'ethers';

import { RootState } from '../../../../../store';
import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';
import { getProspectiveSwapMargin } from '../../utils';

export const confirmMarginUpdateThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/confirmMarginUpdate', async (_, thunkAPI) => {
  try {
    const swapFormState = thunkAPI.getState().swapForm;
    const amm = swapFormState.amm;
    if (!amm) {
      return;
    }

    return await amm.updatePositionMargin({
      fixedLow: 1,
      fixedHigh: 999,
      marginDelta: getProspectiveSwapMargin(swapFormState),
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
