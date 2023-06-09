import { createAsyncThunk } from '@reduxjs/toolkit';
import { settle } from '@voltz-protocol/sdk-v1-stateless';
import { ContractReceipt, providers } from 'ethers';

import { getPoolTrackingName } from '../../../../../utilities/googleAnalytics/get-pool-tracking-name';
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
  {
    signer: providers.JsonRpcSigner | null;
  },
  { state: RootState }
>('settleFlow/confirmSettle', async ({ signer }, thunkAPI) => {
  const state = thunkAPI.getState();
  const position = state.settleFlow.positionDetails;
  if (!position || !signer) {
    return {};
  }
  const account = await signer.getAddress();
  const eventParams: SettleEventParams = {
    account,
    notional: position.notional,
    margin: position.margin - position.realizedPNLFees,
    pool: getPoolTrackingName(position.amm),
    isFT: position.type === 'Fixed',
    isTrader: position.type !== 'LP',
  };

  try {
    pushSettleSubmittedEvent(eventParams);
    const result = await settle({
      positionId: position.id,
      signer,
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
