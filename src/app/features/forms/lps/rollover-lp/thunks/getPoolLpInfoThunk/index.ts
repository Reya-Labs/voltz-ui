import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPoolLpInfo } from '@voltz-protocol/sdk-v1-stateless';

import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import { getDefaultLpFixedHigh, getDefaultLpFixedLow } from '../../utils';

export const getPoolLpInfoThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('rolloverLpForm/getPoolLpInfo', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState().rolloverLpForm;
    const amm = state.amm;
    const previousAmm = state.previousAMM;
    const previousPosition = state.previousPosition;
    if (!amm || !previousAmm || !previousPosition) {
      return;
    }
    const fixedLow = getDefaultLpFixedLow(state);
    const fixedHigh = getDefaultLpFixedHigh(state);

    if (isV1StatelessEnabled()) {
      return await getPoolLpInfo({
        ammId: amm.id,
        fixedLow,
        fixedHigh,
        provider: amm.provider,
      });
    } else {
      return await amm.getPoolLpInfo(fixedLow, fixedHigh);
    }
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
