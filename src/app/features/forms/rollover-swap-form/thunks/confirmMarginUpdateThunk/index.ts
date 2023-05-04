import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ContractReceipt } from 'ethers';

import { RootState } from '../../../../../store';
import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';
import { getProspectiveSwapMargin } from '../../utils';

export const confirmMarginUpdateThunkHandler: AsyncThunkPayloadCreator<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const rolloverSwapForm = thunkAPI.getState().rolloverSwapForm;
    const amm = rolloverSwapForm.amm;
    if (!amm) {
      return;
    }

    return await amm.updatePositionMargin({
      fixedLow: 1,
      fixedHigh: 999,
      marginDelta: getProspectiveSwapMargin(rolloverSwapForm),
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};