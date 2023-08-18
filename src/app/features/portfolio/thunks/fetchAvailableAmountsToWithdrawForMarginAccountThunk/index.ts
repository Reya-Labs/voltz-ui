import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAvailableAmountsToWithdrawForMarginAccount } from '@voltz-protocol/api-sdk-v2';

import { rejectThunkWithError } from '../../../helpers';

export type AvailableAmountForMarginAccountWithdraw = Awaited<
  ReturnType<typeof getAvailableAmountsToWithdrawForMarginAccount>
>[0];

// Define a cache object to store promises
const cache = new Map<
  string,
  Promise<AvailableAmountForMarginAccountWithdraw[] | ReturnType<typeof rejectThunkWithError>>
>();

export const fetchAvailableAmountsToWithdrawForMarginAccountThunk = createAsyncThunk<
  Awaited<AvailableAmountForMarginAccountWithdraw[] | ReturnType<typeof rejectThunkWithError>>,
  {
    id: string;
  }
>('portfolio/fetchAvailableAmountsToWithdrawForMarginAccountThunk', async ({ id }, thunkAPI) => {
  // Check if the promise is already cached
  const cacheId = `${id}`;
  const cachedPromise = cache.get(cacheId);
  if (cachedPromise) {
    return await cachedPromise;
  }

  // Create a new promise and cache it
  const promise = (async () => {
    try {
      return await getAvailableAmountsToWithdrawForMarginAccount({
        id,
      });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  })();

  cache.set(cacheId, promise);

  return await promise;
});
