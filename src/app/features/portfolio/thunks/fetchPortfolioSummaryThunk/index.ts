import { createAsyncThunk } from '@reduxjs/toolkit';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { rejectThunkWithError } from '../../../helpers';
import { getAllowedChainIds } from '../../../network';
type FetchPortfolioSummaryArgs = { chainIds: SupportedChainId[]; ownerAddress: string };
const fetchPortfolioSummary = async ({ chainIds, ownerAddress }: FetchPortfolioSummaryArgs) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return {
    healthyPositionsLength: 6,
    totalPortfolioNotionalValueUSD: 1000,
    totalPortfolioMarginValueUSD: 1000,
    totalPortfolioCollateralValueUSD: 1000,
    totalPortfolioRealizedPNLValueUSD: 1000,
    totalPortfolioUnrealizedPNLValueUSD: 1000,
    warningPositionsLength: 2,
    dangerPositionsLength: 2,
    distributions: [
      { token: 'dai', percentage: 30, distribution: 1000, distributionUSD: 2000 },
      { token: 'eth', percentage: 25, distribution: 1100, distributionUSD: 2200 },
      { token: 'other', percentage: 20, distribution: 1200, distributionUSD: 2400 },
      { token: 'usdc', percentage: 25, distribution: 1300, distributionUSD: 2600 },
    ],
  };
};

export type PortfolioSummary = Awaited<ReturnType<typeof fetchPortfolioSummary>>;

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
      return await fetchPortfolioSummary({ chainIds, ownerAddress: account.toLowerCase() });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  })();

  positionsCache.set(cacheId, promise);

  return await promise;
});
