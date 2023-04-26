import { createAsyncThunk } from '@reduxjs/toolkit';
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
  hasExistingPosition,
} from '../../utils';

export const confirmSwapThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/confirmSwap', async (_, thunkAPI) => {
  const swapFormState = thunkAPI.getState().swapForm;
  const amm = swapFormState.amm;
  if (!amm || !amm.signer) {
    return;
  }

  const account = await amm.signer.getAddress();
  const eventParams = {
    account,
    notional: getProspectiveSwapNotional(swapFormState),
    margin: getProspectiveSwapMargin(swapFormState),
    isEdit: hasExistingPosition(swapFormState),
    pool: getAmmProtocol(amm),
    isFT: getProspectiveSwapMode(swapFormState) === 'fixed',
  };

  try {
    pushSwapTransactionSubmittedEvent(eventParams);
    const result = await amm.swap({
      isFT: getProspectiveSwapMode(swapFormState) === 'fixed',
      notional: getProspectiveSwapNotional(swapFormState),
      margin: getProspectiveSwapMargin(swapFormState),
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
});
