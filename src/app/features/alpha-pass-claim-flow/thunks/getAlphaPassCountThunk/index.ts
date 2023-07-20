import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAdmitPassCount as getAlphaPassCount } from '@voltz-protocol/community-sdk';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers';

export const getAlphaPassCountThunk = createAsyncThunk<
  Awaited<boolean | ReturnType<typeof rejectThunkWithError>>,
  {
    account: string | null;
  },
  { state: RootState }
>('alphaPassClaimFlow/getAlphaPassCount', async ({ account }, thunkAPI) => {
  if (!account) {
    return 0;
  }
  try {
    return await getAlphaPassCount(account);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
