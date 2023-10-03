// Define a cache object to store promises
import { getMarginAccounts } from '@voltz-protocol/api-sdk-v2';

import { rejectThunkWithError } from '../../../helpers';
import { getAllowedChainIds } from '../../../network';
import { PortfolioMarginAccount } from '../../thunks';

const cache = new Map<
  string,
  Promise<PortfolioMarginAccount[] | ReturnType<typeof rejectThunkWithError>>
>();
// TODO: FB move to features/common
export const fetchAllMarginAccounts = async ({
  thunkAPI,
  account,
}: {
  thunkAPI: {
    rejectWithValue: (value: string | undefined) => unknown;
  };
  account: string;
}) => {
  if (!account) {
    return [];
  }
  const chainIds = getAllowedChainIds();
  if (chainIds.length === 0) {
    return [];
  }

  // Check if the promise is already cached
  const cacheId = `${account.toLowerCase()}`;
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
        page: 0,
        perPage: 1000,
      });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  })();

  cache.set(cacheId, promise);

  return await promise;
};
