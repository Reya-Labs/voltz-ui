import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, RateOracle, Token } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { getConfig } from '../../../hooks/voltz-config/config';
import { getAMMs } from './getAMMs';
import { rejectThunkWithError } from './helpers';

const config = getConfig();

export const initialiseAMMsThunk = createAsyncThunk<
  Awaited<ReturnType<typeof getAMMs> | ReturnType<typeof rejectThunkWithError>>,
  {
    trader: boolean;
  }
>('aMMs/initialiseAMMs', async ({ trader }, thunkAPI) => {
  try {
    const whiteList: string[] = [];
    if (config.apply) {
      const generalPools = config.pools
        .filter((pool) => pool.show.general)
        .map((pool) => pool.id.toLowerCase());
      whiteList.concat(generalPools);
      if (trader) {
        const traderPools = config.pools
          .filter((pool) => pool.show.trader)
          .map((pool) => pool.id.toLowerCase());
        whiteList.concat(traderPools);
      }
    }

    return await getAMMs(
      whiteList,
      config.pools.map((p) => p.id.toLowerCase()),
    );
  } catch (err) {
    debugger;
    return rejectThunkWithError(thunkAPI, err);
  }
});

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
    setSignerAction: (
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

export const { setSignerAction } = slice.actions;
export const aMMsReducer = slice.reducer;
