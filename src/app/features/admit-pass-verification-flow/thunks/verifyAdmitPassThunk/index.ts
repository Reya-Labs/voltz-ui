import { createAsyncThunk } from '@reduxjs/toolkit';
import { verifyAdmitPass } from '@voltz-protocol/community-sdk';
import { providers } from 'ethers';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';

export const verifyAdmitPassThunk = createAsyncThunk<
  Awaited<boolean | ReturnType<typeof rejectThunkWithError>>,
  {
    signer: providers.JsonRpcSigner | null;
  },
  { state: RootState }
>('admitPassVerificationFlow/verifyAdmitPass', async ({ signer }, thunkAPI) => {
  if (!signer) {
    return false;
  }
  try {
    /// todo: uncomment and remove default true
    // return await verifyAdmitPass(signer);
    return Promise.resolve(true);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
