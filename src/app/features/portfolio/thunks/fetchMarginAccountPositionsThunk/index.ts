import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMarginAccountPositions } from '@voltz-protocol/api-sdk-v2';

import { rejectThunkWithError } from '../../../helpers';
import { getAllowedChainIds } from '../../../network';
import { PortfolioMarginAccount } from '../fetchMarginAccountsThunk';
import { PortfolioPosition } from '../initialisePortfolioPositionsThunk';

// Define a cache object to store promises
const positionsCache = new Map<
  string,
  Promise<PortfolioPosition[] | ReturnType<typeof rejectThunkWithError>>
>();

export const fetchMarginAccountPositionsThunk = createAsyncThunk<
  Awaited<PortfolioPosition[] | ReturnType<typeof rejectThunkWithError>>,
  {
    id: PortfolioMarginAccount['id'];
  }
>('portfolio/fetchMarginAccountPositions', async ({ id }, thunkAPI) => {
  if (!id) {
    return [];
  }
  const chainIds = getAllowedChainIds();
  if (chainIds.length === 0) {
    return [];
  }

  // Check if the promise is already cached
  const cacheId = `${id}`;
  const cachedPromise = positionsCache.get(cacheId);
  if (cachedPromise) {
    return await cachedPromise;
  }

  // Create a new promise and cache it
  const promise = (async () => {
    try {
      const positions = await getMarginAccountPositions({ id });
      console.log('#### positions', positions);
      return await getMarginAccountPositions({ id });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  })();

  positionsCache.set(cacheId, promise);

  return await promise;
});
