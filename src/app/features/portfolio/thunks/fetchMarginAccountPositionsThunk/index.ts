import { createAsyncThunk } from '@reduxjs/toolkit';

import { rejectThunkWithError } from '../../../helpers';
import { getAllowedChainIds } from '../../../network';
import { PortfolioMarginAccount } from '../fetchMarginAccountsThunk';
import { PortfolioPosition } from '../initialisePortfolioPositionsThunk';
import { getPositionsMock } from './mock';

const fetchMarginAccountPositions = async (id: PortfolioMarginAccount['id']) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return getPositionsMock();
};

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
      return await fetchMarginAccountPositions(id);
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  })();

  positionsCache.set(cacheId, promise);

  return await promise;
});
