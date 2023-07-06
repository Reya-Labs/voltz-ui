import { createAsyncThunk } from '@reduxjs/toolkit';
import { claimAdmitPass } from '@voltz-protocol/community-sdk';
import { providers } from 'ethers';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers';

export const claimAdmitPassThunk = createAsyncThunk<
  Awaited<boolean | ReturnType<typeof rejectThunkWithError>>,
  {
    signer: providers.JsonRpcSigner | null;
  },
  { state: RootState }
>('admitPassClaimFlow/claimAdmitPass', async ({ signer }, thunkAPI) => {
  if (!signer) {
    return false;
  }
  try {
    return await claimAdmitPass(signer);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
