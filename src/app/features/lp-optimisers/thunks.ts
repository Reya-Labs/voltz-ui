import { createAsyncThunk } from '@reduxjs/toolkit';
import { providers } from 'ethers';

import { RootState } from '../../store';

const rejectThunkWithError = (
  thunkAPI: {
    rejectWithValue: (value: string | undefined) => unknown;
  },
  err: unknown,
) => {
  return thunkAPI.rejectWithValue((err as Error)?.message);
};

export const initialiseVaultsThunk = createAsyncThunk<
  Promise<unknown>,
  void,
  {
    state: RootState;
  }
>('lp-optimisers/initialiseVaults', async (_, thunkAPI) => {
  try {
    const { lpVaults } = thunkAPI.getState().lpOptimisers;
    await Promise.allSettled(
      lpVaults.filter((m) => !m.metadata.soon).map((item) => item.vaultInit()),
    );
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const initialiseVaultsForSignerThunk = createAsyncThunk<
  Promise<unknown>,
  {
    signer: providers.JsonRpcSigner;
  },
  {
    state: RootState;
  }
>('lp-optimisers/initialiseVaultsForSigner', async ({ signer }, thunkAPI) => {
  try {
    const { lpVaults, vaultsLoadedState } = thunkAPI.getState().lpOptimisers;
    if (vaultsLoadedState !== 'succeeded') {
      return;
    }
    await Promise.allSettled(
      lpVaults.filter((m) => !m.metadata.soon).map((item) => item.userInit(signer)),
    );
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
