import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMarginAccountSummary } from '@voltz-protocol/api-sdk-v2';

import { rejectThunkWithError } from '../../../helpers';
import { PortfolioMarginAccount } from '../fetchMarginAccountsThunk';

export type MarginAccountSummary = Awaited<ReturnType<typeof getMarginAccountSummary>>;

// Define a cache object to store promises
const cache = new Map<
  string,
  Promise<MarginAccountSummary | ReturnType<typeof rejectThunkWithError>>
>();

export const fetchMarginAccountSummaryThunk = createAsyncThunk<
  Awaited<MarginAccountSummary | ReturnType<typeof rejectThunkWithError>>,
  {
    account: string;
    marginAccountId: PortfolioMarginAccount['id'];
  }
>('portfolio/fetchMarginAccountSummaryThunk', async ({ account, marginAccountId }, thunkAPI) => {
  if (!account) {
    return [];
  }

  // Check if the promise is already cached
  const cacheId = `${account.toLowerCase()}-${marginAccountId.toLowerCase()}`;
  const cachedPromise = cache.get(cacheId);
  if (cachedPromise) {
    return await cachedPromise;
  }

  // Create a new promise and cache it
  const promise = (async () => {
    try {
      return await getMarginAccountSummary({
        marginAccountId,
        ownerAddress: account.toLowerCase(),
      });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  })();

  cache.set(cacheId, promise);

  return await promise;
});
