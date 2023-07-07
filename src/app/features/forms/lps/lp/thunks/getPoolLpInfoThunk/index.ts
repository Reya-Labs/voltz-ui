import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPoolLpInfo } from '@voltz-protocol/sdk-v1-stateless';
import { PoolLpInfo } from '@voltz-protocol/v1-sdk';

import { isV2AMM } from '../../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers';
import {
  getDefaultLpFixedHigh,
  getDefaultLpFixedLow,
  getProspectiveLpFixedHigh,
  getProspectiveLpFixedLow,
} from '../../utils';

export const getPoolLpInfoThunk = createAsyncThunk<
  Awaited<PoolLpInfo | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('lpForm/getPoolLpInfo', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().lpForm.amm;
    if (!amm || !amm.provider) {
      return;
    }

    const lpFormState = thunkAPI.getState().lpForm;

    let fixedLow: number | null = getProspectiveLpFixedLow(lpFormState);
    let fixedHigh: number | null = getProspectiveLpFixedHigh(lpFormState);

    if (fixedLow === null || fixedHigh === null) {
      fixedLow = getDefaultLpFixedLow(lpFormState);
      fixedHigh = getDefaultLpFixedHigh(lpFormState);
    }

    // todo: when deprecating v1, checks against max leverages should be removed
    if (isV2AMM(amm)) {
      return {
        maxLeverage: Number.MAX_SAFE_INTEGER,
      };
    } else {
      if (isV1StatelessEnabled()) {
        return await getPoolLpInfo({
          ammId: amm.id,
          provider: amm.provider,
          fixedHigh,
          fixedLow,
        });
      } else {
        return await amm.getPoolLpInfo(fixedLow, fixedHigh);
      }
    }
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
