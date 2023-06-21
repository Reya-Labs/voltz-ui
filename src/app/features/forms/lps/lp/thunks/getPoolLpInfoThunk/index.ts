import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPoolLpInfo } from '@voltz-protocol/sdk-v1-stateless';
import { getPoolLpInfo as getPoolLpInfoV2 } from '@voltz-protocol/sdk-v2';

import { isV2AMM } from '../../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import {
  getDefaultLpFixedHigh,
  getDefaultLpFixedLow,
  getProspectiveLpFixedHigh,
  getProspectiveLpFixedLow,
} from '../../utils';

export const getPoolLpInfoThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
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
    if (isV2AMM(amm)) {
      return await getPoolLpInfoV2({
        ammId: amm.id,
        fixedHigh,
        fixedLow,
        provider: amm.provider,
      });
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
