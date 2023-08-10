import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMarginAccounts } from '@voltz-protocol/api-sdk-v2';

import { rejectThunkWithError } from '../../../helpers';
import { getAllowedChainIds } from '../../../network';
import { MarginAccountSortId, SortDirection } from '../../types';

export type PortfolioMarginAccount = Awaited<
  ReturnType<typeof getMarginAccounts>
>['marginAccounts'][0];
export type ReturnTypeFetchMarginAccounts = Awaited<ReturnType<typeof getMarginAccounts>>;

// Define a cache object to store promises
const positionsCache = new Map<
  string,
  Promise<PortfolioMarginAccount[] | ReturnType<typeof rejectThunkWithError>>
>();

export const fetchMarginAccountsThunk = createAsyncThunk<
  Awaited<PortfolioMarginAccount[] | ReturnType<typeof rejectThunkWithError>>,
  {
    account: string;
    sort: {
      id: MarginAccountSortId;
      direction: SortDirection;
    };
    page: number;
    perPage: number;
  }
>('portfolio/fetchMarginAccounts', async ({ account, sort, page, perPage }, thunkAPI) => {
  if (!account) {
    return [];
  }
  const chainIds = getAllowedChainIds();
  if (chainIds.length === 0) {
    return [];
  }

  // Check if the promise is already cached
  const cacheId = `${account.toLowerCase()}-${chainIds.join(',')}-${sort.id}${
    sort.direction
  }-${page}`;
  const cachedPromise = positionsCache.get(cacheId);
  if (cachedPromise) {
    return await cachedPromise;
  }

  // Create a new promise and cache it
  const promise = (async () => {
    try {
      return await getMarginAccounts({
        chainIds,
        ownerAddress: account.toLowerCase(),
        sort,
        page,
        perPage,
      });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  })();

  positionsCache.set(cacheId, promise);

  return await promise;
});
