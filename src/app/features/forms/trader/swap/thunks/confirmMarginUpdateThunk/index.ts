import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { updateMargin } from '@voltz-protocol/sdk-v1-stateless';
import { ContractReceipt } from 'ethers';

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
    const amm = swapFormState.amm;
    if (!amm || !amm.signer || !positionId) {
      return;
    }
    if (isV1StatelessEnabled()) {
      return await updateMargin({
        positionId,
        signer: amm.signer,
        margin: getProspectiveSwapMargin(swapFormState),
      });
    } else {
      return await amm.updatePositionMargin({
        fixedLow: 1,
        fixedHigh: 999,
        marginDelta: getProspectiveSwapMargin(swapFormState),
      });
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
