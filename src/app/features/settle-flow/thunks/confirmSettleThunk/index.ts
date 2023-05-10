import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContractReceipt } from 'ethers';

import { getAmmProtocol } from '../../../../../utilities/amm';
import { RootState } from '../../../../store';
import { extractError } from '../../../helpers/extract-error';
import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';
import {
  pushSettleFailedEvent,
  pushSettleSubmittedEvent,
  pushSettleSuccessEvent,
  SettleEventParams,
} from '../../analytics';

export const confirmSettleThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('settleFlow/confirmSettle', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const position = state.settleFlow.position;
  const amm = position?.amm;
  if (!amm || !position) {
    return {};
  }
  const account = !amm.signer ? '' : await amm.signer.getAddress();
  const eventParams: SettleEventParams = {
    account,
    notional: position.notional,
    margin: position.margin - position.realizedPnLFromFeesPaid,
    pool: getAmmProtocol(amm),
    isFT: position.positionType === 1,
    isTrader: position.positionType !== 3,
  };

  try {
    pushSettleSubmittedEvent(eventParams);
    const result = await amm.settlePosition({
      fixedLow: position.fixedRateLower.toNumber(),
      fixedHigh: position.fixedRateUpper.toNumber(),
    });
    pushSettleSuccessEvent(eventParams);
    return result;
  } catch (err) {
    pushSettleFailedEvent({
      ...eventParams,
      errorMessage: extractError(err),
    });
    return rejectThunkWithError(thunkAPI, err);
  }
});
