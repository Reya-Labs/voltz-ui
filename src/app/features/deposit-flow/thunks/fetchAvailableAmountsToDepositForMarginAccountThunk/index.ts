import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAvailableAmountsToDepositForMarginAccount } from '@voltz-protocol/api-sdk-v2';

import { rejectThunkWithError } from '../../../helpers';

export type AvailableAmountForMarginAccountDeposit = Awaited<
  ReturnType<typeof getAvailableAmountsToDepositForMarginAccount>
>[0];

// Define a cache object to store promises
const cache = new Map<
  string,
  Promise<AvailableAmountForMarginAccountDeposit[] | ReturnType<typeof rejectThunkWithError>>
>();

export const fetchAvailableAmountsToDepositForMarginAccountThunk = createAsyncThunk<
  Awaited<AvailableAmountForMarginAccountDeposit[] | ReturnType<typeof rejectThunkWithError>>,
  {
    id: string;
  }
>('portfolio/fetchAvailableAmountsToDepositForMarginAccountThunk', async ({ id }, thunkAPI) => {
  // Check if the promise is already cached
  const cacheId = `${id}`;
  const cachedPromise = cache.get(cacheId);
  if (cachedPromise) {
    return await cachedPromise;
  }

  // Create a new promise and cache it
  const promise = (async () => {
    try {
      return await getAvailableAmountsToDepositForMarginAccount({
        id,
      });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  })();

  cache.set(cacheId, promise);

  return await promise;
});
