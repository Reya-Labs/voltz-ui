import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContractReceipt } from 'ethers';

import { RootState } from '../../../../../store';
import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';
import {
  getProspectiveLpFixedHigh,
  getProspectiveLpFixedLow,
  getProspectiveLpMargin,
  getProspectiveLpNotional,
} from '../../utils';

export const confirmLpThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('rolloverLpForm/confirmLp', async (_, thunkAPI) => {
  try {
    const lpFormState = thunkAPI.getState().lpForm;
    const amm = lpFormState.amm;
    if (!amm) {
      return;
    }

    const fixedLow = getProspectiveLpFixedLow(lpFormState);
    const fixedHigh = getProspectiveLpFixedHigh(lpFormState);

    if (fixedLow === null || fixedHigh === null) {
      return;
    }

    let prospectiveNotional: number = getProspectiveLpNotional(lpFormState);
    let addLiquidity: boolean = true;

    if (prospectiveNotional < 0) {
      addLiquidity = false;
      prospectiveNotional = -prospectiveNotional;
    }

    return await amm.lp({
      addLiquidity: addLiquidity,
      notional: prospectiveNotional,
      margin: getProspectiveLpMargin(lpFormState),
      fixedLow: fixedLow,
      fixedHigh: fixedHigh,
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
