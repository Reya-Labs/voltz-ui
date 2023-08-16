import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMarginAccounts } from '@voltz-protocol/api-sdk-v2';

import { rejectThunkWithError } from '../../../helpers';
import { getAllowedChainIds } from '../../../network';
import { PortfolioMarginAccount } from '../fetchMarginAccountsThunk';

// Define a cache object to store promises
const cache = new Map<
  string,
  Promise<PortfolioMarginAccount[] | ReturnType<typeof rejectThunkWithError>>
>();

export const fetchMarginAccountsForWithdrawThunk = createAsyncThunk<
  Awaited<PortfolioMarginAccount[] | ReturnType<typeof rejectThunkWithError>>,
  {
    account: string;
  }
>('portfolio/fetchMarginAccountsForWithdrawThunk', async ({ account }, thunkAPI) => {
  if (!account) {
    return [];
  }
  const chainIds = getAllowedChainIds();
  if (chainIds.length === 0) {
    return [];
  }

  // Check if the promise is already cached
  const cacheId = `${account.toLowerCase()}-${chainIds.join(',')}`;
  const cachedPromise = cache.get(cacheId);
  if (cachedPromise) {
    return await cachedPromise;
  }

  // Create a new promise and cache it
  const promise = (async () => {
    try {
      return await getMarginAccounts({
        chainIds,
        ownerAddress: account.toLowerCase(),
        sort: {
          id: 'balance',
          direction: 'descending',
        },
        page: 1,
        perPage: 1000,
      });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  })();

  cache.set(cacheId, promise);

  return await promise;
});
