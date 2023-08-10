import { createAsyncThunk } from '@reduxjs/toolkit';
import { providers } from 'ethers';

import { rejectThunkWithError } from '../../../helpers';

type CreateMarginAccountArgs = {
  signer: providers.JsonRpcSigner | null;
  name: string;
};
const createMarginAccount = async ({ name, signer }: CreateMarginAccountArgs) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const num = Math.random() * 100;
      if (num > 50) {
        reject(new Error('Random error happened. Chance is 50-50 try again!'));
        return;
      }

      resolve(true);
    }, 1000);
  });
};
export const createMarginAccountThunk = createAsyncThunk<
  Awaited<boolean | ReturnType<typeof rejectThunkWithError>>,
  {
    signer: providers.JsonRpcSigner | null;
    name: string;
  }
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
