import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContractReceipt } from 'ethers';

import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import {
  getProspectiveLpFixedHigh,
  getProspectiveLpFixedLow,
  getProspectiveLpMargin,
} from '../../utils';

export const confirmMarginUpdateThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('lpForm/confirmMarginUpdate', async (_, thunkAPI) => {
  try {
    const lpFormState = thunkAPI.getState().lpForm;
    const amm = lpFormState.amm;

    if (!amm) {
      return;
    }

    if (!lpFormState.selectedPosition) {
      return;
    }

    const fixedLow: number | null = getProspectiveLpFixedLow(lpFormState);
    const fixedHigh: number | null = getProspectiveLpFixedHigh(lpFormState);

    if (fixedLow === null || fixedHigh === null) {
      return;
    }

    return await amm.updatePositionMargin({
      fixedLow,
      fixedHigh,
      marginDelta: getProspectiveLpMargin(lpFormState),
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
