import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBalance } from '@voltz-protocol/sdk-v1-stateless';

import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';

// TODO: FB same as in swap-form
export const getWalletBalanceThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('lpForm/getWalletBalance', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().lpForm.amm;
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
});
