import { createAsyncThunk } from '@reduxjs/toolkit';
import { claimAdmitPass as claimAlphaPass } from '@voltz-protocol/community-sdk';
import { providers } from 'ethers';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers';

export const claimAlphaPassThunk = createAsyncThunk<
  Awaited<boolean | ReturnType<typeof rejectThunkWithError>>,
  {
    signer: providers.JsonRpcSigner | null;
  },
  { state: RootState }
>('alphaPassClaimFlow/claimAlphaPass', async ({ signer }, thunkAPI) => {
  if (!signer) {
    return false;
  }
  try {
    return await claimAlphaPass(signer);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
