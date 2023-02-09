import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, getAMMs, SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { initialiseAMMsThunk } from './thunks';

type SliceState = {
  aMMsLoadedState: Record<SupportedNetworksEnum, 'idle' | 'pending' | 'succeeded' | 'failed'>;
  aMMs: Record<SupportedNetworksEnum, AMM[]>;
};

const initialState: SliceState = {
  aMMsLoadedState: {
    [SupportedNetworksEnum.mainnet]: 'idle',
    [SupportedNetworksEnum.goerli]: 'idle',
    [SupportedNetworksEnum.arbitrum]: 'idle',
    [SupportedNetworksEnum.arbitrumGoerli]: 'idle',
  },
  aMMs: {
    [SupportedNetworksEnum.mainnet]: [],
    [SupportedNetworksEnum.goerli]: [],
    [SupportedNetworksEnum.arbitrum]: [],
    [SupportedNetworksEnum.arbitrumGoerli]: [],
  },
};

export const slice = createSlice({
  name: 'aMMs',
  initialState,
  reducers: {
    setSignerForAMMsAction: (
      state,
      {
        payload: { signer, network },
      }: PayloadAction<{
        signer: providers.JsonRpcSigner | null;
        network: SupportedNetworksEnum;
      }>,
    ) => {
      state.aMMs[network].forEach((aMM) => (aMM.signer = signer));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialiseAMMsThunk.pending, (state, { meta }) => {
        state.aMMsLoadedState[meta.arg.network] = 'pending';
      })
      .addCase(initialiseAMMsThunk.rejected, (state, { meta }) => {
        state.aMMsLoadedState[meta.arg.network] = 'failed';
        state.aMMs[meta.arg.network] = [];
      })
      .addCase(initialiseAMMsThunk.fulfilled, (state, { payload, meta }) => {
        state.aMMsLoadedState[meta.arg.network] = 'succeeded';
        state.aMMs[meta.arg.network] = payload as Awaited<ReturnType<typeof getAMMs>>['amms'];
      });
  },
});

export const { setSignerForAMMsAction } = slice.actions;
export const aMMsReducer = slice.reducer;
