import { createAsyncThunk } from '@reduxjs/toolkit';
import { settle } from '@voltz-protocol/sdk-v1-stateless';
import { settle as settleV2 } from '@voltz-protocol/sdk-v2';
import { ContractReceipt, providers } from 'ethers';

import { getPoolTrackingName } from '../../../../../utilities/googleAnalytics/get-pool-tracking-name';
import { RootState } from '../../../../store';
import { extractError, rejectThunkWithError } from '../../../helpers';
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
  const position = state.settleFlow.position;
  if (!position || !signer) {
    return {};
  }
  const account = await signer.getAddress();
  const eventParams: SettleEventParams = {
    account,
    notional: position.notional,
    margin: position.margin - position.realizedPNLFees,
    pool: getPoolTrackingName(position.pool),
    isFT: position.type === 'Fixed',
    isTrader: position.type !== 'LP',
  };

  try {
    pushSettleSubmittedEvent(eventParams);
    let result: ContractReceipt;
    if (position.pool.isV2) {
      result = await settleV2({
        positionId: position.id,
        signer,
      });
    } else {
      result = await settle({
        positionId: position.id,
        signer,
      });
    }
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
