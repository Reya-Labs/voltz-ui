import { createAsyncThunk } from '@reduxjs/toolkit';
import { rolloverWithLp } from '@voltz-protocol/sdk-v1-stateless';
import { rolloverWithLp as rolloverWithLpV2 } from '@voltz-protocol/sdk-v2';
import { ContractReceipt } from 'ethers';

import { getAmmProtocol, isV2AMM } from '../../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { extractError, rejectThunkWithError } from '../../../../../helpers';
import {
  pushRolloverFailedEvent,
  pushRolloverSubmittedEvent,
  pushRolloverSuccessEvent,
  RolloverEventParams,
} from '../../analytics';
import {
  getProspectiveLpFixedHigh,
  getProspectiveLpFixedLow,
  getProspectiveLpMargin,
  getProspectiveLpNotional,
} from '../../utils';

export const confirmLpRolloverThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('rolloverLpForm/confirmLpRollover', async (_, thunkAPI) => {
  const state = thunkAPI.getState().rolloverLpForm;
  const amm = state.amm;
  const previousAMM = state.previousAMM;
  const previousPosition = state.previousPosition;
  if (!amm || !previousAMM || !amm.signer || !previousPosition) {
    return;
  }

  const fixedLow = getProspectiveLpFixedLow(state);
  const fixedHigh = getProspectiveLpFixedHigh(state);

  if (fixedLow === null || fixedHigh === null) {
    return;
  }
  const account = await amm.signer.getAddress();
  const notional = getProspectiveLpNotional(state);
  const margin = getProspectiveLpMargin(state);
  const eventParams: RolloverEventParams = {
    account,
    notional,
    margin,
    pool: getAmmProtocol(amm),
  };

  try {
    pushRolloverSubmittedEvent(eventParams);
    let result: ContractReceipt;
    if (isV2AMM(amm)) {
      result = await rolloverWithLpV2({
        maturedPositionId: previousPosition.id,
        ammId: amm.id,
        fixedLow,
        fixedHigh,
        notional,
        margin,
        signer: amm.signer,
      });
    } else {
      if (isV1StatelessEnabled()) {
        result = await rolloverWithLp({
          maturedPositionId: previousPosition.id,
          ammId: amm.id,
          fixedLow,
          fixedHigh,
          notional,
          margin,
          signer: amm.signer,
        });
      } else {
        result = await previousAMM.rolloverWithMint({
          fixedLow,
          fixedHigh,
          notional,
          margin,
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
});
