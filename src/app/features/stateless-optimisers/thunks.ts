import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  depositAndRegister,
  getAllMellowProducts,
  rollover,
  withdraw,
} from '@voltz-protocol/v1-sdk';
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
    userAddress: string | undefined;
  }
>('stateless-optimisers/getProducts', async ({ userAddress }, thunkAPI) => {
  try {
    const routers = await getAllMellowProducts(userAddress);

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
        throw new Error('New state not returned');
      }

      return mapRouter(response.newOptimiserState);
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  },
);

export const getOptimisersDepositGasFeeThunk = createAsyncThunk<
  number | Awaited<ReturnType<typeof rejectThunkWithError>>,
  {
    optimiserId: string;
    amount: number;
    spareWeights: [string, number][];
    registration?: boolean;
    signer: ethers.Signer | null;
  }
>(
  'stateless-optimisers/deposit-gas-fee',
  async ({ optimiserId, amount, spareWeights, registration, signer }, thunkAPI) => {
    try {
      if (!signer) {
        throw new Error('Wallet not connected');
      }

      const response = await depositAndRegister({
        onlyGasEstimate: true,
        optimiserId,
        amount,
        spareWeights,
        registration,
        signer,
      });

      return response.gasEstimateUsd;
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  },
);

export const withdrawOptimisersThunk = createAsyncThunk<
  OptimiserInfo | Awaited<ReturnType<typeof rejectThunkWithError>>,
  {
    optimiserId: string;
    vaultId: string;
    signer: ethers.Signer | null;
  }
>('stateless-optimisers/withdraw', async ({ optimiserId, vaultId, signer }, thunkAPI) => {
  try {
    if (!signer) {
      throw new Error('Wallet not connected');
    }

    const response = await withdraw({
      optimiserId,
      vaultId,
      signer,
    });

    if (!response.newOptimiserState) {
      throw new Error('New state not returned');
    }

    return mapRouter(response.newOptimiserState);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const rolloverOptimisersThunk = createAsyncThunk<
  OptimiserInfo | Awaited<ReturnType<typeof rejectThunkWithError>>,
  {
    optimiserId: string;
    vaultId: string;
    spareWeights: [string, number][];
    signer: ethers.Signer | null;
  }
>(
  'stateless-optimisers/rollover',
  async ({ optimiserId, vaultId, spareWeights, signer }, thunkAPI) => {
    try {
      if (!signer) {
        throw new Error('Wallet not connected');
      }

      const response = await rollover({
        optimiserId,
        vaultId,
        spareWeights,
        signer,
      });

      if (!response.newOptimiserState) {
        throw new Error('New state not returned');
      }

      return mapRouter(response.newOptimiserState);
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  },
);
