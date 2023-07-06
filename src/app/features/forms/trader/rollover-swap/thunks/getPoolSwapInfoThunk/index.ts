import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { getPoolSwapInfo } from '@voltz-protocol/sdk-v1-stateless';
import { getPoolSwapInfo as getPoolSwapInfoV2 } from '@voltz-protocol/sdk-v2';
import { PoolSwapInfo } from '@voltz-protocol/v1-sdk';

import { isV2AMM } from '../../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers';

// todo: FB same as in swap
export const getPoolSwapInfoThunkHandler: AsyncThunkPayloadCreator<
  Awaited<PoolSwapInfo | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().rolloverSwapForm.amm;
    if (!amm) {
      return;
    }

    if (isV2AMM(amm)) {
      const availableNotional = await getPoolSwapInfoV2(amm.id);

      // todo: when deprecating v1, checks against max leverages should be removed
      return {
        ...availableNotional,
        maxLeverageFixedTaker: Number.MAX_SAFE_INTEGER,
        maxLeverageVariableTaker: Number.MAX_SAFE_INTEGER,
      }
    } else {
      if (isV1StatelessEnabled()) {
        return await getPoolSwapInfo({
          ammId: amm.id,
          provider: amm.provider,
        });
      } else {
        return await amm.getPoolSwapInfo();
      }
    }
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const getPoolSwapInfoThunk = createAsyncThunk<
  Awaited<PoolSwapInfo | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('rolloverSwapForm/getPoolSwapInfo', getPoolSwapInfoThunkHandler);
