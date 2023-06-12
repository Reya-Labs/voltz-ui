import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { approvePeriphery } from '@voltz-protocol/sdk-v1-stateless';

import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';

export const approveUnderlyingTokenThunkHandler: AsyncThunkPayloadCreator<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().rolloverSwapForm.amm;
    if (!amm || !amm.signer) {
      return;
    }

    if (isV1StatelessEnabled()) {
      return await approvePeriphery({
        signer: amm.signer,
        ammId: amm.id,
      });
    } else {
      return await amm.approveUnderlyingTokenForPeripheryV1();
    }
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const approveUnderlyingTokenThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('rolloverSwapForm/approveUnderlyingToken', approveUnderlyingTokenThunkHandler);
