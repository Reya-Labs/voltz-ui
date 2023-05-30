import { createAsyncThunk } from '@reduxjs/toolkit';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';
import { positionMocks } from './mock';

export type PositionMock = {
  id: string;
  type: 'LP' | 'Variable' | 'Fixed';
  notional: number;
  margin: number;
  status: {
    health: 'healthy' | 'danger' | 'warning';
    variant: 'matured' | 'settled' | 'active';
    currentFixed: number;
    receiving: number;
    paying: number;
    fixLow: number;
    fixHigh: number;
  };
  unrealizedPNL: number;
  realizedPNLTotal: number;
  realizedPNLFees: number;
  realizedPNLCashflow: number;
  unrealizedPNLUSD: number;
  realizedPNLTotalUSD: number;
  realizedPNLFeesUSD: number;
  realizedPNLCashflowUSD: number;

  amm: {
    id: string;
    isBorrowing: boolean;
    isAaveV3: boolean;
    isV2: boolean;
    rateOracle: {
      protocolId: number;
    };
    underlyingToken: {
      name: 'eth' | 'usdc' | 'usdt' | 'dai';
    };
    termEndTimestampInMS: number;
    termStartTimestampInMS: number;
    market: 'Aave' | 'Compound' | 'Lido' | 'Rocket' | 'GMX:GLP' | 'SOFR';
    chainId: SupportedChainId;
  };
};

export const initialisePortfolioPositionsThunk = createAsyncThunk<
  Awaited<PositionMock[] | ReturnType<typeof rejectThunkWithError>>,
  {
    chainId: SupportedChainId;
    signer: providers.JsonRpcSigner | null;
  }
>('portfolio/initialisePortfolioPositions', async (_, thunkAPI) => {
  try {
    const promise = new Promise((resolve) => setTimeout(resolve, 1500));
    await promise;
    return positionMocks;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
