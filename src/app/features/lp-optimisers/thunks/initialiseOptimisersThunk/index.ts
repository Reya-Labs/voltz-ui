import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllMellowProducts, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { ethers } from 'ethers';

import { getAlchemyKey } from '../../../../../utilities/getAlchemyKey';
import { getInfuraKey } from '../../../../../utilities/getInfuraKey';
import { rejectThunkWithError } from '../../../helpers';
import { OptimiserInfo } from '../../types';

export const initialiseOptimisersThunk = createAsyncThunk<
  OptimiserInfo | Awaited<ReturnType<typeof rejectThunkWithError>>,
  {
    signer: ethers.Signer | null;
    chainId: SupportedChainId;
  }
>('lp-optimisers/getProducts', async ({ chainId, signer }, thunkAPI) => {
  try {
    const mappedRouters: OptimiserInfo[] = await getAllMellowProducts({
      signer,
      type: 'all',
      chainId,
      alchemyApiKey: getAlchemyKey(),
      infuraApiKey: getInfuraKey(),
    });
    return mappedRouters;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
