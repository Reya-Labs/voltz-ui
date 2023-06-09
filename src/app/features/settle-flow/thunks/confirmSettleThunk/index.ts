import { createAsyncThunk } from '@reduxjs/toolkit';
import { settle } from '@voltz-protocol/sdk-v1-stateless';
import { ContractReceipt, providers } from 'ethers';

import { getAmmProtocol } from '../../../../../utilities/amm';
import { getPoolTrackingName } from '../../../../../utilities/googleAnalytics/helpers';
import { isPortfolioNextEnabled } from '../../../../../utilities/isEnvVarProvided/is-portfolio-next-enabled';
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
  if (isPortfolioNextEnabled()) {
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
  }

  // todo: FB deprecated after portfolio is released fully
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
