import { createAsyncThunk } from '@reduxjs/toolkit';
import { lp } from '@voltz-protocol/sdk-v1-stateless/dist/types/actions/lp/lp';
import { ContractReceipt } from 'ethers';

import { getAmmProtocol } from '../../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { extractError } from '../../../../../helpers/extract-error';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import {
  LPEventParams,
  pushLPTransactionFailedEvent,
  pushLPTransactionSubmittedEvent,
  pushLPTransactionSuccessEvent,
} from '../../analytics';
import {
  getProspectiveLpFixedHigh,
  getProspectiveLpFixedLow,
  getProspectiveLpMargin,
  getProspectiveLpNotional,
} from '../../utils';

export const confirmLpThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('lpForm/confirmLp', async (_, thunkAPI) => {
  const lpFormState = thunkAPI.getState().lpForm;
  const amm = lpFormState.amm;
  const selectedPosition = lpFormState.selectedPosition;
  if (!amm || !amm.signer) {
    return;
  }

  const fixedLow = getProspectiveLpFixedLow(lpFormState);
  const fixedHigh = getProspectiveLpFixedHigh(lpFormState);

  if (fixedLow === null || fixedHigh === null) {
    return;
  }
  const account = await amm.signer.getAddress();

  let notional: number = getProspectiveLpNotional(lpFormState);
  let addLiquidity: boolean = true;

  if (notional < 0) {
    addLiquidity = false;
    notional = -notional;
  }
  const margin = getProspectiveLpMargin(lpFormState);
  const eventParams: LPEventParams = {
    account,
    notional,
    margin,
    isEdit: Boolean(selectedPosition),
    pool: getAmmProtocol(amm),
    fixedLow: fixedLow,
    fixedHigh: fixedHigh,
  };

  try {
    pushLPTransactionSubmittedEvent(eventParams);
    let result: ContractReceipt;
    if (isV1StatelessEnabled()) {
      result = await lp({
        addLiquidity,
        notional,
        margin,
        fixedLow,
        fixedHigh,
        ammId: amm.id,
        signer: amm.signer,
      });
    } else {
      result = await amm.lp({
        addLiquidity,
        notional,
        margin,
        fixedLow,
        fixedHigh,
      });
    }
    pushLPTransactionSuccessEvent(eventParams);
    return result;
  } catch (err) {
    pushLPTransactionFailedEvent({
      ...eventParams,
      errorMessage: extractError(err),
    });
    return rejectThunkWithError(thunkAPI, err);
  }
});
