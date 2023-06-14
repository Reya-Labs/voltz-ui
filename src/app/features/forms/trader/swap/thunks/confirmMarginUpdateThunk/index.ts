import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { updateMargin } from '@voltz-protocol/sdk-v1-stateless';
import { updateMargin as updateMarginV2 } from '@voltz-protocol/sdk-v2';
import { ContractReceipt } from 'ethers';

import { isV2AMM } from '../../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import { getExistingPositionId, getProspectiveSwapMargin } from '../../utils';

export const confirmMarginUpdateThunkHandler: AsyncThunkPayloadCreator<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const swapFormState = thunkAPI.getState().swapForm;
    const positionId = getExistingPositionId(swapFormState);
    const prospectiveSwapMargin = getProspectiveSwapMargin(swapFormState);
    const amm = swapFormState.amm;
    if (!amm || !amm.signer || !positionId) {
      return;
    }
    if (isV2AMM(amm)) {
      return await updateMarginV2({
        positionId,
        signer: amm.signer,
        margin: prospectiveSwapMargin,
      });
    } else {
      if (isV1StatelessEnabled()) {
        return await updateMargin({
          positionId,
          signer: amm.signer,
          margin: prospectiveSwapMargin,
        });
      } else {
        return await amm.updatePositionMargin({
          fixedLow: 1,
          fixedHigh: 999,
          marginDelta: prospectiveSwapMargin,
        });
      }
    }
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const confirmMarginUpdateThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/confirmMarginUpdate', confirmMarginUpdateThunkHandler);
