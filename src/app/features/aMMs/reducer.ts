import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, RateOracle, Token } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { getConfig } from '../../../hooks/voltz-config/config';
import { getAMMs } from './getAMMs';
import { initialiseAMMsThunk } from './thunks';

const config = getConfig();

type SliceState = {
  aMMsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  aMMs: AMM[];
};

const initialState: SliceState = {
  aMMsLoadedState: 'idle',
  aMMs: [],
};

export const slice = createSlice({
  name: 'aMMs',
  initialState,
  reducers: {
    setSignerForAMMsAction: (
      state,
      action: PayloadAction<{
        signer: providers.JsonRpcSigner | null;
      }>,
    ) => {
      state.aMMs.forEach((aMM) => (aMM.signer = action.payload.signer));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialiseAMMsThunk.pending, (state) => {
        state.aMMsLoadedState = 'pending';
      })
      .addCase(initialiseAMMsThunk.rejected, (state) => {
        state.aMMsLoadedState = 'failed';
      })
      .addCase(initialiseAMMsThunk.fulfilled, (state, action) => {
        state.aMMsLoadedState = 'succeeded';
        state.aMMs = (action.payload as Awaited<ReturnType<typeof getAMMs>>).map(
          ({
            id: ammId,
            marginEngine: { id: marginEngineAddress },
            rateOracle: {
              id: rateOracleAddress,
              protocolId,
              token: { id: tokenAddress, name: tokenName, decimals },
            },
            tickSpacing,
            termStartTimestamp,
            termEndTimestamp,
          }) =>
            new AMM({
              id: ammId,
              signer: null,
              provider: config.PROVIDER,
              rateOracle: new RateOracle({
                id: rateOracleAddress,
                protocolId: parseInt(protocolId, 10),
              }),
              underlyingToken: new Token({
                id: tokenAddress,
                name: tokenName,
                decimals: decimals,
              }),
              factoryAddress: config.factoryAddress || '0x',
              marginEngineAddress,
              termStartTimestamp: termStartTimestamp,
              termEndTimestamp: termEndTimestamp,
              tickSpacing: parseInt(tickSpacing, 10),
              wethAddress: config.wethAddress,
            }),
        );
      });
  },
});

export const { setSignerForAMMsAction } = slice.actions;
export const aMMsReducer = slice.reducer;
