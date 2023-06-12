import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { getBalance } from '@voltz-protocol/sdk-v1-stateless';

import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';

export const getWalletBalanceThunkHandler: AsyncThunkPayloadCreator<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().swapForm.amm;
    if (!amm || !amm.signer) {
      return 0;
    }
    if (isV1StatelessEnabled()) {
      return await getBalance({
        ammId: amm.id,
        signer: amm.signer,
      });
    } else {
      return await amm.underlyingTokens();
    }
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const getWalletBalanceThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/getWalletBalance', getWalletBalanceThunkHandler);
