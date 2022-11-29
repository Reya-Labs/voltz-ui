import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { providers } from 'ethers';

import { RootState } from '../../store';
import { MellowProduct } from './getMellowLPVaults/config';
import { getMellowLPVaults } from './getMellowLPVaults/getMellowLPVaults';
import { rejectThunkWithError } from './helpers';

export const vaultInitThunk = createAsyncThunk<
  Promise<unknown>,
  void,
  {
    state: RootState;
  }
>('ecosystem/vaultInit', async (_, thunkAPI) => {
  try {
    const { lpVaults } = thunkAPI.getState().ecosystem;
    await Promise.allSettled(
      lpVaults.filter((m) => !m.metadata.soon).map((item) => item.vault.vaultInit()),
    );
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const userInitThunk = createAsyncThunk<
  Promise<unknown>,
  {
    signer: providers.JsonRpcSigner;
  },
  {
    state: RootState;
  }
>('ecosystem/userInit', async ({ signer }, thunkAPI) => {
  try {
    const { lpVaults, vaultsLoadedState } = thunkAPI.getState().ecosystem;
    if (vaultsLoadedState !== 'succeeded') {
      return;
    }
    await Promise.allSettled(
      lpVaults.filter((m) => !m.metadata.soon).map((item) => item.vault.userInit(signer)),
    );
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

type SliceState = {
  vaultsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  signerLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  selectedVaultId?: MellowProduct['id'];
  lpVaults: MellowProduct[];
};

const initialState: SliceState = {
  vaultsLoadedState: 'idle',
  signerLoadedState: 'idle',
  selectedVaultId: undefined,
  lpVaults: getMellowLPVaults(),
};

export const slice = createSlice({
  name: 'ecosystem',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(vaultInitThunk.pending, (state) => {
        state.vaultsLoadedState = 'pending';
      })
      .addCase(vaultInitThunk.rejected, (state) => {
        state.vaultsLoadedState = 'failed';
      })
      .addCase(vaultInitThunk.fulfilled, (state) => {
        state.vaultsLoadedState = 'succeeded';
      })
      .addCase(userInitThunk.pending, (state) => {
        state.signerLoadedState = 'pending';
      })
      .addCase(userInitThunk.rejected, (state) => {
        state.signerLoadedState = 'failed';
      })
      .addCase(userInitThunk.fulfilled, (state) => {
        state.signerLoadedState = 'succeeded';
      });
  },
});

export const ecosystemReducer = slice.reducer;
