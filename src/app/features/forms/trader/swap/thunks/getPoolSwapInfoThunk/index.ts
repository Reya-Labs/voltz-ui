import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { getPoolSwapInfo } from '@voltz-protocol/sdk-v1-stateless';
import { PoolSwapInfo } from '@voltz-protocol/v1-sdk';

import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';

export const getPoolSwapInfoThunkHandler: AsyncThunkPayloadCreator<
  Awaited<PoolSwapInfo | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().swapForm.amm;
    if (!amm || !amm.provider) {
      return;
    }
    if (isV1StatelessEnabled()) {
      return await getPoolSwapInfo({
        isFixedTaker: true,
        ammId: amm.id,
        provider: amm.provider,
      });
    } else {
      return await amm.getPoolSwapInfo();
    }
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const getPoolSwapInfoThunk = createAsyncThunk<
  Awaited<PoolSwapInfo | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/getPoolSwapInfo', getPoolSwapInfoThunkHandler);
