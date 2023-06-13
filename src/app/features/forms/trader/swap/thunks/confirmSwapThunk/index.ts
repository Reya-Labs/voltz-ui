import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { editSwap, swap } from '@voltz-protocol/sdk-v1-stateless';
import { ContractReceipt } from 'ethers';

import { getAmmProtocol } from '../../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { extractError } from '../../../../../helpers/extract-error';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import {
  pushSwapTransactionFailedEvent,
  pushSwapTransactionSubmittedEvent,
  pushSwapTransactionSuccessEvent,
  SwapEventParams,
} from '../../analytics';
import {
  getExistingPositionId,
  getProspectiveSwapMargin,
  getProspectiveSwapMode,
  getProspectiveSwapNotional,
} from '../../utils';

export const confirmSwapThunkHandler: AsyncThunkPayloadCreator<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  const swapFormState = thunkAPI.getState().swapForm;
  const amm = swapFormState.amm;
  if (!amm || !amm.signer) {
    return;
  }

  const account = await amm.signer.getAddress();
  const prospectiveSwapNotional = getProspectiveSwapNotional(swapFormState);
  const prospectiveSwapMargin = getProspectiveSwapMargin(swapFormState);
  const positionId = getExistingPositionId(swapFormState);
  const isEdit = positionId !== null;
  const prospectiveSwapMode = getProspectiveSwapMode(swapFormState);
  const eventParams: SwapEventParams = {
    account,
    notional: prospectiveSwapNotional,
    margin: prospectiveSwapMargin,
    isEdit,
    pool: getAmmProtocol(amm),
    isFT: prospectiveSwapMode === 'fixed',
  };
  const notional =
    prospectiveSwapMode === 'fixed' ? -prospectiveSwapNotional : prospectiveSwapNotional;

  try {
    pushSwapTransactionSubmittedEvent(eventParams);
    let result: ContractReceipt;
    if (isV1StatelessEnabled()) {
      if (isEdit) {
        result = await editSwap({
          positionId: positionId,
          notional,
          margin: prospectiveSwapMargin,
          signer: amm.signer,
        });
      } else {
        result = await swap({
          ammId: amm.id,
          notional,
          margin: prospectiveSwapMargin,
          signer: amm.signer,
        });
      }
    } else {
      result = await amm.swap({
        isFT: prospectiveSwapMode === 'fixed',
        notional: prospectiveSwapNotional,
        margin: prospectiveSwapMargin,
        fixedLow: 1,
        fixedHigh: 999,
      });
    }
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
>('swapForm/confirmSwap', confirmSwapThunkHandler);
