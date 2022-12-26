import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMellowLPVaults, MellowProduct } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { RootState } from '../../store';
import { rejectThunkWithError } from './helpers';

export const initialiseVaultsThunk = createAsyncThunk<
  Promise<unknown>,
  void,
  {
    state: RootState;
  }
>('ecosystem/initialiseVaults', async (_, thunkAPI) => {
  try {
    const { lpVaults } = thunkAPI.getState().ecosystem;
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
>('ecosystem/initialiseVaultsForSigner', async ({ signer }, thunkAPI) => {
  try {
    const { lpVaults, vaultsLoadedState } = thunkAPI.getState().ecosystem;
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
  lpVaults: getMellowLPVaults({
    network: process.env.REACT_APP_NETWORK || '',
    providerURL: process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK || '',
  }),
};

export const slice = createSlice({
  name: 'ecosystem',
  initialState,
  reducers: {
    resetVaultsAction: (state) => {
      // todo: Filip and Costin fix this by not keeping SDK stuff in UI
      state.lpVaults = getMellowLPVaults({
        network: process.env.REACT_APP_NETWORK || '',
        providerURL: process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK || '',
      }) as never;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialiseVaultsThunk.pending, (state) => {
        state.vaultsLoadedState = 'pending';
      })
      .addCase(initialiseVaultsThunk.rejected, (state) => {
        state.vaultsLoadedState = 'failed';
      })
      .addCase(initialiseVaultsThunk.fulfilled, (state) => {
        state.vaultsLoadedState = 'succeeded';
      })
      .addCase(initialiseVaultsForSignerThunk.pending, (state) => {
        state.signerLoadedState = 'pending';
      })
      .addCase(initialiseVaultsForSignerThunk.rejected, (state) => {
        state.signerLoadedState = 'failed';
      })
      .addCase(initialiseVaultsForSignerThunk.fulfilled, (state) => {
        state.signerLoadedState = 'succeeded';
      });
  },
});

export const { resetVaultsAction } = slice.actions;
export const ecosystemReducer = slice.reducer;
