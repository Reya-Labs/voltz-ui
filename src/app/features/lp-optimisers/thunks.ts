import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllMellowProductsV1, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { ethers } from 'ethers';

import { getAlchemyKeyForChain } from '../../../utilities/network/get-alchemy-key-for-chain';
import { OptimiserInfo } from './types';

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
    type: 'active' | 'all';
    chainId: SupportedChainId;
  }
>('lp-optimisers/getProducts', async ({ chainId, signer, type }, thunkAPI) => {
  try {
    const mappedRouters: OptimiserInfo[] = await getAllMellowProductsV1({
      signer,
      type,
      chainId,
      alchemyApiKey: getAlchemyKeyForChain(chainId),
    });
    return mappedRouters;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
