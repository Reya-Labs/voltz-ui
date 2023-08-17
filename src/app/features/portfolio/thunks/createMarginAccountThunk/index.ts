import { createAsyncThunk } from '@reduxjs/toolkit';
import { createMarginAccount, CreateMarginAccountArgs } from '@voltz-protocol/sdk-v2';
import { ContractReceipt } from 'ethers';

import { rejectThunkWithError } from '../../../helpers';

export const createMarginAccountThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  CreateMarginAccountArgs
>('portfolio/createMarginAccount', async ({ name, signer }, thunkAPI) => {
  if (!signer || !name) {
    return false;
  }

  try {
    return await createMarginAccount({ name, signer });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
