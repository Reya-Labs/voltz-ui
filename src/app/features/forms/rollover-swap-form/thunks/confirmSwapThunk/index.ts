import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { ContractReceipt } from 'ethers';

import { getAmmProtocol } from '../../../../../../utilities/amm';
import { RootState } from '../../../../../store';
import { extractError } from '../../../../helpers/extract-error';
import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';
import {
  pushSwapTransactionFailedEvent,
  pushSwapTransactionSubmittedEvent,
  pushSwapTransactionSuccessEvent,
} from '../../analytics';
import {
  getProspectiveSwapMargin,
  getProspectiveSwapMode,
  getProspectiveSwapNotional,
} from '../../utils';

export const confirmSwapThunkHandler: AsyncThunkPayloadCreator<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  const state = thunkAPI.getState().rolloverSwapForm;
  const amm = state.amm;
  if (!amm || !amm.signer) {
    return;
  }

  const account = await amm.signer.getAddress();
  const prospectiveSwapNotional = getProspectiveSwapNotional(state);
  const prospectiveSwapMargin = getProspectiveSwapMargin(state);
  const prospectiveSwapMode = getProspectiveSwapMode(state);
  const eventParams = {
    account,
    notional: prospectiveSwapNotional,
    margin: prospectiveSwapMargin,
    isEdit: false,
    pool: getAmmProtocol(amm),
    isFT: prospectiveSwapMode === 'fixed',
  };

  try {
    pushSwapTransactionSubmittedEvent(eventParams);
    const result = await amm.swap({
      isFT: prospectiveSwapMode === 'fixed',
      notional: prospectiveSwapNotional,
      margin: prospectiveSwapMargin,
      fixedLow: 1,
      fixedHigh: 999,
    });
    pushSwapTransactionSuccessEvent(eventParams);
    return result;
  } catch (err) {
    pushSwapTransactionFailedEvent({
      ...eventParams,
      errorMessage: extractError(err),
    });
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const confirmSwapThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('rolloverSwapForm/confirmSwap', confirmSwapThunkHandler);
