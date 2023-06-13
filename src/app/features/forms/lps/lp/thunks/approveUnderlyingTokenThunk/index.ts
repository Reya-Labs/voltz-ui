import { createAsyncThunk } from '@reduxjs/toolkit';
import { approvePeriphery } from '@voltz-protocol/sdk-v1-stateless';
import { approvePeriphery as approvePeripheryV2 } from '@voltz-protocol/sdk-v2';

import { isV2AMM } from '../../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';

// TODO: FB same as in swap-form
export const approveUnderlyingTokenThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('lpForm/approveUnderlyingToken', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().lpForm.amm;
    if (!amm || !amm.signer) {
      return;
    }
    if (isV2AMM(amm)) {
      return await approvePeripheryV2({
        signer: amm.signer,
        ammId: amm.id,
      });
    } else {
      if (isV1StatelessEnabled()) {
        return await approvePeriphery({
          signer: amm.signer,
          ammId: amm.id,
        });
      } else {
        return await amm.approveUnderlyingTokenForPeripheryV1();
      }
    }
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
