import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllMellowProducts, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { ethers } from 'ethers';

import { getAlchemyKeyForChain } from '../../../../../utilities/network/get-alchemy-key-for-chain';
import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';
import { OptimiserInfo } from '../../types';

export const initialiseOptimisersThunk = createAsyncThunk<
  OptimiserInfo | Awaited<ReturnType<typeof rejectThunkWithError>>,
  {
    signer: ethers.Signer | null;
    type: 'active' | 'all';
    chainId: SupportedChainId;
  }
>('lp-optimisers/getProducts', async ({ chainId, signer, type }, thunkAPI) => {
  try {
    const mappedRouters: OptimiserInfo[] = await getAllMellowProducts({
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
