import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMarginAccountsForSwapLP, Tokens } from '@voltz-protocol/api-sdk-v2';

import { rejectThunkWithError } from '../../../helpers';
import { getAllowedChainIds } from '../../../network';

export type MarginAccountForSwapLP = Awaited<
  ReturnType<typeof getMarginAccountsForSwapLP>
>['marginAccounts'][0];
export type ReturnTypeFetchMarginAccountsForSwapLP = Awaited<
  ReturnType<typeof getMarginAccountsForSwapLP>
>;

// Define a cache object to store promises
const cache = new Map<
  string,
  Promise<MarginAccountForSwapLP[] | ReturnType<typeof rejectThunkWithError>>
>();

export const fetchMarginAccountsForSwapLPThunk = createAsyncThunk<
  Awaited<MarginAccountForSwapLP[] | ReturnType<typeof rejectThunkWithError>>,
  {
    account: string;
    poolId: string;
    poolToken: Tokens;
  }
>(
  'marginAccountsForSwapLPSelection/fetchMarginAccountsForSwapLPThunk',
  async ({ account, poolId }, thunkAPI) => {
    if (!account || !poolId) {
      return [];
    }
    const chainIds = getAllowedChainIds();
    if (chainIds.length === 0) {
      return [];
    }

    // Check if the promise is already cached
    const cacheId = `${account.toLowerCase()}-${chainIds.join(',')}-${poolId}`;
    const cachedPromise = cache.get(cacheId);
    if (cachedPromise) {
      return await cachedPromise;
    }

    // Create a new promise and cache it
    const promise = (async () => {
      try {
        return await getMarginAccountsForSwapLP({
          chainIds,
          ownerAddress: account.toLowerCase(),
          poolId,
        });
      } catch (err) {
        return rejectThunkWithError(thunkAPI, err);
      }
    })();

    cache.set(cacheId, promise);

    return await promise;
  },
);
