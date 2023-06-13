import { createAsyncThunk } from '@reduxjs/toolkit';
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
      // TODO: Ioana, woooow! The args seem way off and not inlined
      // TODO: with what we agreed on! Please review and fix!
      // result = rolloverAndLp({
      //   fixedLow,
      //   fixedHigh,
      //   notional,
      //   margin,
      //   newMarginEngine: amm.marginEngineAddress,
      //   rolloverPosition: {
      //     tickLower: previousPosition.tickLower,
      //     tickUpper: previousPosition.tickUpper,
      //     settlementBalance: previousPosition.settlementBalance,
      //   },
      // });
    } else {
      if (isV1StatelessEnabled()) {
        // todo: Artur, integrate once available via sdk-v1
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
