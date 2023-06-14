import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAdmitPassClaimed } from '@voltz-protocol/community-sdk';
import { providers } from 'ethers';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';

export const fetchIsAdmitPassClaimedThunk = createAsyncThunk<
  Awaited<boolean | ReturnType<typeof rejectThunkWithError>>,
  {
    signer: providers.JsonRpcSigner | null;
  },
  { state: RootState }
>('admitPassClaimFlow/fetchIsAdmitPassClaimed', async ({ signer }, thunkAPI) => {
  if (!signer) {
    return false;
  }
  try {
    return await isAdmitPassClaimed(signer);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
