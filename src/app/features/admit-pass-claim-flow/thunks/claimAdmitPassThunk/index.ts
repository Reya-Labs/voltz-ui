import { createAsyncThunk } from '@reduxjs/toolkit';
import { providers } from 'ethers';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';

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
    // todo: replace with real admit pass
    const promise = new Promise((resolve, reject) =>
      setTimeout(
        () => (Math.random() > 0.5 ? resolve(true) : reject('Something went wrong...')),
        1500,
      ),
    );
    return await promise;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
