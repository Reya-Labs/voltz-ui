import { createAsyncThunk } from '@reduxjs/toolkit';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { rejectThunkWithError } from '../../../helpers';
import { getAllowedChainIds } from '../../../network';
import { MarginAccountSortId, SortDirection } from '../../types';
import { mockGetMarginAccountsPage1, mockGetMarginAccountsPage2 } from './mocks';

type FetchMarginAccountsArgs = {
  chainIds: SupportedChainId[];
  ownerAddress: string;
  sort: {
    id: MarginAccountSortId;
    direction: SortDirection;
  };
  page: number;
  perPage: number;
};
const fetchMarginAccounts = async ({
  chainIds,
  sort,
  ownerAddress,
  page,
  perPage,
}: FetchMarginAccountsArgs) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  if (page === 0) {
    return mockGetMarginAccountsPage1;
  }
  if (page === 1) {
    return mockGetMarginAccountsPage2;
  }
  return {
    marginAccounts: [],
    totalMarginAccounts: 15,
  };
};

export type PortfolioMarginAccount = Awaited<
  ReturnType<typeof fetchMarginAccounts>
>['marginAccounts'][0];
export type ReturnTypeFetchMarginAccounts = Awaited<ReturnType<typeof fetchMarginAccounts>>;

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
      return await fetchMarginAccounts({
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
