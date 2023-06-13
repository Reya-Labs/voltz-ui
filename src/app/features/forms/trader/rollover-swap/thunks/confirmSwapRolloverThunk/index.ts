import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { rolloverWithSwap } from '@voltz-protocol/sdk-v1-stateless';
import { rolloverAnd as rolloverWithSwapV2 } from '@voltz-protocol/sdk-v2';
import { ContractReceipt } from 'ethers';

import { getAmmProtocol, isV2AMM } from '../../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { extractError } from '../../../../../helpers/extract-error';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import {
  pushRolloverFailedEvent,
  pushRolloverSubmittedEvent,
  pushRolloverSuccessEvent,
  RolloverEventParams,
} from '../../analytics';
import {
  getProspectiveSwapMargin,
  getProspectiveSwapMode,
  getProspectiveSwapNotional,
} from '../../utils';

export const confirmSwapRolloverThunkHandler: AsyncThunkPayloadCreator<
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
  const eventParams: RolloverEventParams = {
    account,
    notional: prospectiveSwapNotional,
    margin: prospectiveSwapMargin,
    pool: getAmmProtocol(amm),
    isFT,
  };
  let result: ContractReceipt;
  try {
    pushRolloverSubmittedEvent(eventParams);
    if (isV2AMM(amm)) {
      // todo: check with Ioana, signatures are different than sdk-v1
      // todo: check with Ioana, name is weird
      result = await rolloverWithSwapV2({
        maturedPositionId: previousPosition.id,
        ammId: amm.id,
        // isFT,
        notional: prospectiveSwapNotional,
        margin: prospectiveSwapMargin,
        signer: amm.signer,
      });
    } else {
      if (isV1StatelessEnabled()) {
        result = await rolloverWithSwap({
          maturedPositionId: previousPosition.id,
          ammId: amm.id,
          isFT,
          notional: prospectiveSwapNotional,
          margin: prospectiveSwapMargin,
          signer: amm.signer,
        });
      } else {
        result = await previousAMM.rolloverWithSwap({
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
      }
    }

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

export const confirmSwapRolloverThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('rolloverSwapForm/confirmSwapRollover', confirmSwapRolloverThunkHandler);
