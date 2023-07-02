import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPortfolioPositions } from '@voltz-protocol/v1-sdk';

import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';
import { getAllowedChainIds } from '../../../network';
export type PortfolioPosition = Awaited<ReturnType<typeof getPortfolioPositions>>[0];

// Define a cache object to store promises
const positionsCache = new Map<
  string,
  Promise<PortfolioPosition[] | ReturnType<typeof rejectThunkWithError>>
>();

export const initialisePortfolioPositionsThunk = createAsyncThunk<
  Awaited<PortfolioPosition[] | ReturnType<typeof rejectThunkWithError>>,
  {
    account: string;
  }
>('portfolio/initialisePortfolioPositions', async ({ account }, thunkAPI) => {
  if (!account) {
    return [];
  }
  const chainIds = getAllowedChainIds();
  if (chainIds.length === 0) {
    return [];
  }

  // Check if the promise is already cached
  const cacheId = `${account.toLowerCase()}-${chainIds.join(',')}`;
  const cachedPromise = positionsCache.get(cacheId);
  if (cachedPromise) {
    return await cachedPromise;
  }

  // Create a new promise and cache it
  const promise = (async () => {
    try {

      const positions = await getPortfolioPositions(chainIds, account.toLowerCase());
      return positions;
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  })();

  positionsCache.set(cacheId, promise);

  return await promise;
});
