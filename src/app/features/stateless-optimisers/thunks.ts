import { createAsyncThunk } from '@reduxjs/toolkit';
import { depositAndRegister , getAllMellowProducts } from '@voltz-protocol/v1-sdk';
import { ethers } from 'ethers';

import { OptimiserInfo } from './types';

// TODO: enrich this mapping
const mapRouter = (r: Awaited<ReturnType<typeof getAllMellowProducts>>[0]): OptimiserInfo => (r);

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
    userAddress: string | undefined,
  }
>('stateless-optimisers/getProducts', async ({userAddress}, thunkAPI) => {
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
    routerId: string;
    amount: number;
    spareWeights: [string, number][];
    registration?: boolean;
    signer: ethers.Signer | null;
 }
>('stateless-optimisers/deposit', async ({
  routerId, amount, spareWeights, registration, signer
}, thunkAPI) => {
  try {
    if (!signer) {
      throw new Error('Wallet not connected');
    }
  
    const response = await depositAndRegister({
      routerId,
      amount,
      spareWeights,
      registration,
      signer
    });

    if (!response.newRouterState) {
      throw new Error('New state not returned');
    }

    return mapRouter(response.newRouterState);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const getOptimisersDepositGasFeeThunk = createAsyncThunk<
  number | Awaited<ReturnType<typeof rejectThunkWithError>>,
 {
    routerId: string;
    amount: number;
    spareWeights: [string, number][];
    registration?: boolean;
    signer: ethers.Signer | null;
 }
>('stateless-optimisers/deposit-gas-fee', async ({
  routerId, amount, spareWeights, registration, signer
}, thunkAPI) => {
  try {
    if (!signer) {
      throw new Error('Wallet not connected');
    }
  
    const response = await depositAndRegister({
      onlyGasEstimate: true,
      routerId,
      amount,
      spareWeights,
      registration,
      signer
    });

    return response.gasEstimateUsd;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
