import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { ContractReceipt } from 'ethers';

import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers';
import {
  getProspectiveLpFixedHigh,
  getProspectiveLpFixedLow,
  updateMarginService,
} from '../../../../common';
import { getExistingPositionId, getProspectiveLpMargin } from '../../utils';

export const confirmMarginUpdateThunkHandler: AsyncThunkPayloadCreator<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const lpFormState = thunkAPI.getState().lpForm;
    const amm = lpFormState.amm;
    const positionId = getExistingPositionId(lpFormState);
    const fixedLow: number | null = getProspectiveLpFixedLow(lpFormState);
    const fixedHigh: number | null = getProspectiveLpFixedHigh(lpFormState);
    const margin = getProspectiveLpMargin(lpFormState);

    if (!amm || !amm.signer || !positionId) {
      return;
    }

    if (fixedLow === null || fixedHigh === null) {
      return;
    }

    return await updateMarginService({
      amm,
      signer: amm.signer,
      positionId,
      margin,
      fixedHigh,
      fixedLow,
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const confirmMarginUpdateThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('lpForm/confirmMarginUpdate', confirmMarginUpdateThunkHandler);
