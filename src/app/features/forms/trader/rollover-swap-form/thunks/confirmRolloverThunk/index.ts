import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { ContractReceipt } from 'ethers';

import { getAmmProtocol } from '../../../../../../../utilities/amm';
import { RootState } from '../../../../../../store';
import { extractError } from '../../../../../helpers/extract-error';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import {
  pushRolloverFailedEvent,
  pushRolloverSubmittedEvent,
  pushRolloverSuccessEvent,
} from '../../analytics';
import {
  getProspectiveSwapMargin,
  getProspectiveSwapMode,
  getProspectiveSwapNotional,
} from '../../utils';

export const confirmRolloverThunkHandler: AsyncThunkPayloadCreator<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  const state = thunkAPI.getState().rolloverSwapForm;
  const amm = state.amm;
  const previousAMM = state.previousAMM;
  const previousPosition = state.previousPosition;
  if (!amm || !previousAMM || !amm.signer || !previousPosition) {
    return;
  }

  const account = await amm.signer.getAddress();
  const prospectiveSwapNotional = getProspectiveSwapNotional(state);
  const prospectiveSwapMargin = getProspectiveSwapMargin(state);
  const prospectiveSwapMode = getProspectiveSwapMode(state);
  const isFT = prospectiveSwapMode === 'fixed';
  const eventParams = {
    account,
    notional: prospectiveSwapNotional,
    margin: prospectiveSwapMargin,
    pool: getAmmProtocol(amm),
    isFT,
  };

  try {
    pushRolloverSubmittedEvent(eventParams);
    const result = await previousAMM.rolloverWithSwap({
      isFT,
      notional: prospectiveSwapNotional,
      margin: prospectiveSwapMargin,
      fixedLow: 1,
      fixedHigh: 999,
      newMarginEngine: amm.marginEngineAddress,
      rolloverPosition: {
        tickLower: previousPosition.tickLower,
        tickUpper: previousPosition.tickUpper,
        settlementBalance: previousPosition.settlementBalance,
      },
    });
    pushRolloverSuccessEvent(eventParams);
    return result;
  } catch (err) {
    pushRolloverFailedEvent({
      ...eventParams,
      errorMessage: extractError(err),
    });
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const confirmRolloverThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('rolloverSwapForm/confirmRollover', confirmRolloverThunkHandler);
