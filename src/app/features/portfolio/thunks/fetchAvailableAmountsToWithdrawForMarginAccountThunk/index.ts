import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAvailableAmountsToWithdrawForMarginAccount } from '@voltz-protocol/api-sdk-v2';

import { rejectThunkWithError } from '../../../helpers';

export type AvailableAmountForMarginAccount = Awaited<
  ReturnType<typeof getAvailableAmountsToWithdrawForMarginAccount>
>[0];
export type ReturnTypeFetchAvailableAmountsToWithdrawForMarginAccount = Awaited<
  ReturnType<typeof getAvailableAmountsToWithdrawForMarginAccount>
>;

// Define a cache object to store promises
const cache = new Map<
  string,
  Promise<AvailableAmountForMarginAccount[] | ReturnType<typeof rejectThunkWithError>>
>();

export const fetchAvailableAmountsToWithdrawForMarginAccountThunk = createAsyncThunk<
  Awaited<AvailableAmountForMarginAccount[] | ReturnType<typeof rejectThunkWithError>>,
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
