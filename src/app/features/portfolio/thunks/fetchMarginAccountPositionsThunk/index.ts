import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMarginAccountPositions } from '@voltz-protocol/api-sdk-v2';

import { rejectThunkWithError } from '../../../helpers';
import { getAllowedChainIds } from '../../../network';
import { PortfolioMarginAccount } from '../fetchMarginAccountsThunk';
import { PortfolioPosition } from '../initialisePortfolioPositionsThunk';

// Define a cache object to store promises
const cache = new Map<
  string,
  Promise<PortfolioPosition[] | ReturnType<typeof rejectThunkWithError>>
>();

export const fetchMarginAccountPositionsThunk = createAsyncThunk<
  Awaited<PortfolioPosition[] | ReturnType<typeof rejectThunkWithError>>,
  {
    id: PortfolioMarginAccount['id'];
    perPage?: number;
  }
>('portfolio/fetchMarginAccountPositions', async ({ id, perPage }, thunkAPI) => {
  if (!id) {
    return [];
  }
  const chainIds = getAllowedChainIds();
  if (chainIds.length === 0) {
    return [];
  }

  // Check if the promise is already cached
  const cacheId = perPage ? `${id}-${perPage}` : id;
  const cachedPromise = cache.get(cacheId);
  if (cachedPromise) {
    return await cachedPromise;
  }

  // Create a new promise and cache it
  const promise = (async () => {
    try {
      return await getMarginAccountPositions({ id, perPage });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  })();

  cache.set(cacheId, promise);

  return await promise;
});
