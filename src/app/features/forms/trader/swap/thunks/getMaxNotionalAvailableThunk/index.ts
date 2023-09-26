import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers';
import { getMaxNotionalAvailableService } from '../../../../common';

// Define a cache object to store promises
const cache = new Map<string, Promise<number | ReturnType<typeof rejectThunkWithError>>>();

export const getMaxNotionalAvailableHandler: AsyncThunkPayloadCreator<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  const {
    pool,
    marginAccount,
    userInput: { mode },
  } = thunkAPI.getState().swapForm;

  if (!pool || !marginAccount) {
    return 0;
  }

  // Check if the promise is already cached
  const cacheId = `${mode}-${pool.id}-${marginAccount.id}`;
  const cachedPromise = cache.get(cacheId);
  if (cachedPromise) {
    return await cachedPromise;
  }

  const promise = (async () => {
    try {
      return await getMaxNotionalAvailableService({
        poolId: pool.id,
        marginAccountId: marginAccount.id,
        mode,
      });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  })();

  cache.set(cacheId, promise);

  return await promise;
};

export const getMaxNotionalAvailableThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/getMaxNotionalAvailableThunk', getMaxNotionalAvailableHandler);
