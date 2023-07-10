import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAdmitPassClaimed as isAlphaPassClaimed } from '@voltz-protocol/community-sdk';
import { providers } from 'ethers';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers';

export const fetchIsAlphaPassClaimedThunk = createAsyncThunk<
  Awaited<boolean | ReturnType<typeof rejectThunkWithError>>,
  {
    signer: providers.JsonRpcSigner | null;
  },
  { state: RootState }
>('alphaPassClaimFlow/fetchIsAlphaPassClaimed', async ({ signer }, thunkAPI) => {
  if (!signer) {
    return false;
  }
  try {
    return await isAlphaPassClaimed(signer);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
