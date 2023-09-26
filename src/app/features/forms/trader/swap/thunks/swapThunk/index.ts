import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { swapMarginAccount } from '@voltz-protocol/sdk-v2';
import { ContractReceipt } from 'ethers';

import { getPoolProtocol } from '../../../../../../../utilities/amm';
import { RootState } from '../../../../../../store';
import { extractError, rejectThunkWithError } from '../../../../../helpers';
import {
  pushSwapTransactionFailedEvent,
  pushSwapTransactionSubmittedEvent,
  pushSwapTransactionSuccessEvent,
  SwapEventParams,
} from '../../analytics';
import { getProspectiveSwapMode, getProspectiveSwapNotional } from '../../utils';

export const swapThunkHandler: AsyncThunkPayloadCreator<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  const swapFormState = thunkAPI.getState().swapForm;
  const { pool, signer, marginAccount } = swapFormState;
  if (!pool || !signer || !marginAccount) {
    return;
  }

  const account = await signer.getAddress();
  const prospectiveSwapNotional = getProspectiveSwapNotional(swapFormState);
  const prospectiveSwapMode = getProspectiveSwapMode(swapFormState);
  const eventParams: SwapEventParams = {
    account,
    notional: prospectiveSwapNotional,
    pool: getPoolProtocol(pool),
    isFT: prospectiveSwapMode === 'fixed',
  };
  const notional =
    prospectiveSwapMode === 'fixed' ? -prospectiveSwapNotional : prospectiveSwapNotional;

  try {
    pushSwapTransactionSubmittedEvent(eventParams);
    const result = (await swapMarginAccount({
      ammId: pool.id,
      notional,
      signer,
      marginAccountId: marginAccount.id,
    })) as ContractReceipt;
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

export const swapThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/swapThunk', swapThunkHandler);
