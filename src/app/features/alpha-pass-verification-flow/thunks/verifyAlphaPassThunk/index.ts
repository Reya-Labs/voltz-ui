import { createAsyncThunk } from '@reduxjs/toolkit';
import { verifyAdmitPass as verifyAlphaPass } from '@voltz-protocol/community-sdk';
import { providers } from 'ethers';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers';

export const verifyAlphaPassThunk = createAsyncThunk<
  Awaited<boolean | ReturnType<typeof rejectThunkWithError>>,
  {
    signer: providers.JsonRpcSigner | null;
    account: string;
  },
  { state: RootState }
>('alphaPassVerificationFlow/verifyAlphaPass', async ({ signer, account }, thunkAPI) => {
  if (!signer || !account) {
    return false;
  }
  try {
    return await verifyAlphaPass(signer);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
