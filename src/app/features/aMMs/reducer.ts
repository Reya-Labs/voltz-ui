import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, getAMMsV1, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { initialiseAMMsThunk } from './thunks';

type SliceState = {
  aMMsLoadedState: Record<SupportedChainId, 'idle' | 'pending' | 'succeeded' | 'failed'>;
  aMMs: Record<SupportedChainId, AMM[]>;
};

const initialState: SliceState = {
  aMMsLoadedState: {
    [SupportedChainId.mainnet]: 'idle',
    [SupportedChainId.goerli]: 'idle',
    [SupportedChainId.arbitrum]: 'idle',
    [SupportedChainId.arbitrumGoerli]: 'idle',
  },
  aMMs: {
    [SupportedChainId.mainnet]: [],
    [SupportedChainId.goerli]: [],
    [SupportedChainId.arbitrum]: [],
    [SupportedChainId.arbitrumGoerli]: [],
  },
};

export const slice = createSlice({
  name: 'aMMs',
  initialState,
  reducers: {
    setSignerForAMMsAction: (
      state,
      {
        payload: { signer, chainId },
      }: PayloadAction<{
        signer: providers.JsonRpcSigner | null;
        chainId: SupportedChainId;
      }>,
    ) => {
      state.aMMs[chainId].forEach((aMM) => (aMM.signer = signer));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialiseAMMsThunk.pending, (state, { meta }) => {
        state.aMMsLoadedState[meta.arg.chainId] = 'pending';
      })
      .addCase(initialiseAMMsThunk.rejected, (state, { meta }) => {
        state.aMMsLoadedState[meta.arg.chainId] = 'failed';
        state.aMMs[meta.arg.chainId] = [];
      })
      .addCase(initialiseAMMsThunk.fulfilled, (state, { payload, meta }) => {
        state.aMMsLoadedState[meta.arg.chainId] = 'succeeded';
        state.aMMs[meta.arg.chainId] = payload as Awaited<ReturnType<typeof getAMMsV1>>['amms'];
      });
  },
});

export const { setSignerForAMMsAction } = slice.actions;
export const aMMsReducer = slice.reducer;
