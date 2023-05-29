import { createAsyncThunk } from '@reduxjs/toolkit';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';
import { positionMocks } from './mock';

export type PositionMock = {
  id: string;
  type: 'LP' | 'Variable' | 'Fixed';
  chainId: SupportedChainId;
  market: 'Aave' | 'Compound' | 'Lido' | 'Rocket' | 'GMX:GLP' | 'SOFR';
  token?: 'eth' | 'usdc' | 'usdt' | 'dai';
  name: string;
  notional: number;
  margin: number;
  termEndTimestampInMS: number;
  termStartTimestampInMS: number;
  status: {
    variant: 'none' | 'receiving' | 'in-range' | 'paying';
    value: number;
    currentFixed: number;
    receiving: number;
    paying: number;
    fixLow: number;
    fixHigh: number;
  };
  unrealizedPNL: number;
  realizedPNL: number;
  isBorrowing: boolean;
  isAaveV3: boolean;
  isV2: boolean;
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
