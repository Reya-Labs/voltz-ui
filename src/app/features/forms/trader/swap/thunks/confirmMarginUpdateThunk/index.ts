import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { ContractReceipt } from 'ethers';

import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers';
import { updateMarginService } from '../../../../common';
import { getExistingPositionId, getProspectiveSwapMargin } from '../../utils';

export const confirmMarginUpdateThunkHandler: AsyncThunkPayloadCreator<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const swapFormState = thunkAPI.getState().swapForm;
    const positionId = getExistingPositionId(swapFormState);
    const margin = getProspectiveSwapMargin(swapFormState);
    const amm = swapFormState.amm;
    if (!amm || !amm.signer || !positionId) {
      return;
    }
    return await updateMarginService({
      amm,
      signer: amm.signer,
      positionId,
      margin,
      fixedHigh: 999,
      fixedLow: 1,
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const confirmMarginUpdateThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/confirmMarginUpdate', confirmMarginUpdateThunkHandler);
