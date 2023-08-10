import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPortfolioSummary } from '@voltz-protocol/api-sdk-v2';

import { rejectThunkWithError } from '../../../helpers';
import { getAllowedChainIds } from '../../../network';

export type PortfolioSummary = Awaited<ReturnType<typeof getPortfolioSummary>>;

// Define a cache object to store promises
const positionsCache = new Map<
  string,
  Promise<PortfolioSummary | ReturnType<typeof rejectThunkWithError>>
>();

export const fetchPortfolioSummaryThunk = createAsyncThunk<
  Awaited<PortfolioSummary | ReturnType<typeof rejectThunkWithError>>,
  {
    account: string;
  }
>('portfolio/fetchPortfolioSummary', async ({ account }, thunkAPI) => {
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
      return await getPortfolioSummary({ chainIds, ownerAddress: account.toLowerCase() });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  })();

  positionsCache.set(cacheId, promise);

  return await promise;
});
