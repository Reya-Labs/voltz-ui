import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAdmitPassCount } from '@voltz-protocol/community-sdk';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers';

export const getAdmitPassCountThunk = createAsyncThunk<
  Awaited<boolean | ReturnType<typeof rejectThunkWithError>>,
  {
    account: string | null;
  },
  { state: RootState }
>('admitPassClaimFlow/getAdmitPassCount', async ({ account }, thunkAPI) => {
  if (!account) {
    return 0;
  }
  try {
    return await getAdmitPassCount(account);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
