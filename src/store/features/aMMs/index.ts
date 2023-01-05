import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, BorrowAMM, RateOracle, Token } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { getConfig } from '../../../hooks/voltz-config/config';
import { isBorrowing } from '../../../utilities/isBorrowing';
import { RootState } from '../../store';
import { getAMMs } from './getAMMs';
import { rejectThunkWithError } from './helpers';

const config = getConfig();

export const initialiseAMMsThunk = createAsyncThunk<
  Awaited<ReturnType<typeof getAMMs> | ReturnType<typeof rejectThunkWithError>>,
  void
>('aMMs/initialiseAMMs', async (_, thunkAPI) => {
  try {
    const whiteList: string[] = [];
    if (config.apply) {
      const generalPools = config.pools
        .filter((pool) => pool.show.general)
        .map((pool) => pool.id.toLowerCase());
      whiteList.concat(generalPools);
    }

    return await getAMMs(
      whiteList,
      config.pools.map((p) => p.id.toLowerCase()),
    );
  } catch (err) {
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

export const selectAMMs = (state: RootState): AMM[] => state.aMMs.aMMs;

export const selectTraderAMMs = (state: RootState): AMM[] => {
  const traderPoolsIds = config.pools
    .filter((pool) => pool.show.trader)
    .map((pool) => pool.id.toLowerCase());
  if (traderPoolsIds.length === 0) {
    return state.aMMs.aMMs;
  }
  return state.aMMs.aMMs.filter((amm) => traderPoolsIds.includes(amm.id.toLowerCase()));
};

export const selectBorrowAMMs = (state: RootState): BorrowAMM[] => {
  const aMMs = state.aMMs.aMMs;
  const borrowMarkets = aMMs.filter((amm) => isBorrowing(amm.rateOracle.protocolId));
  const liveBorrowMarkets = borrowMarkets.filter(
    (amm) => Date.now().valueOf() < amm.endDateTime.toMillis(),
  );
  return liveBorrowMarkets.map((amm) => new BorrowAMM({ id: amm.id, amm: amm }));
};
