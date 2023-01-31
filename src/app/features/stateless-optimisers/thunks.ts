import { createAsyncThunk } from '@reduxjs/toolkit';
import { depositAndRegister, getAllMellowProducts } from '@voltz-protocol/v1-sdk';
import { ethers } from 'ethers';

import { OptimiserInfo } from './types';

// TODO: enrich this mapping
const mapRouter = (r: Awaited<ReturnType<typeof getAllMellowProducts>>[0]): OptimiserInfo => r;

const rejectThunkWithError = (
  thunkAPI: {
    rejectWithValue: (value: string | undefined) => unknown;
  },
  err: unknown,
) => {
  if (typeof err === 'string') {
    return thunkAPI.rejectWithValue(err);
  }
  return thunkAPI.rejectWithValue((err as Error)?.message);
};

export const initialiseOptimisersThunk = createAsyncThunk<
  OptimiserInfo | Awaited<ReturnType<typeof rejectThunkWithError>>,
  {
    signer: ethers.Signer | null;
  }
>('stateless-optimisers/getProducts', async ({ signer }, thunkAPI) => {
  try {
    const routers = await getAllMellowProducts(signer);

    const mappedRouters: OptimiserInfo[] = routers.map(mapRouter);

    return mappedRouters;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const depositOptimisersThunk = createAsyncThunk<
  OptimiserInfo | Awaited<ReturnType<typeof rejectThunkWithError>>,
  {
    optimiserId: string;
    amount: number;
    spareWeights: [string, number][];
    registration?: boolean;
    signer: ethers.Signer | null;
  }
>(
  'stateless-optimisers/deposit',
  async ({ optimiserId, amount, spareWeights, registration, signer }, thunkAPI) => {
    try {
      if (!signer) {
        throw new Error('Wallet not connected');
      }

      const response = await depositAndRegister({
        optimiserId,
        amount,
        spareWeights,
        registration,
        signer,
      });

      if (!response.newOptimiserState) {
        return rejectThunkWithError(thunkAPI, 'New state not returned');
      }

      return mapRouter(response.newOptimiserState);
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  },
);
