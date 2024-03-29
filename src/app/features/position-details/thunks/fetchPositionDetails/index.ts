import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPortfolioPositionDetails } from '@voltz-protocol/v1-sdk';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers';

export type PortfolioPositionDetails = Awaited<ReturnType<typeof getPortfolioPositionDetails>>;
export type PortfolioPositionPool = NonNullable<PortfolioPositionDetails>['pool'];
// Define a cache object to store promises
const positionDetailsCache = new Map<
  string,
  Promise<PortfolioPositionDetails | ReturnType<typeof rejectThunkWithError>>
>();

export const fetchPositionDetailsThunk = createAsyncThunk<
  Awaited<PortfolioPositionDetails | ReturnType<typeof rejectThunkWithError>>,
  {
    positionId: string;
  },
  { state: RootState }
>('positionDetails/fetchPositionDetails', async ({ positionId }, thunkAPI) => {
  // Check if the promise is already cached
  const cachedPromise = positionDetailsCache.get(positionId);
  if (cachedPromise) {
    return await cachedPromise;
  }

  // Create a new promise and cache it
  const promise = (async () => {
    try {
      return await getPortfolioPositionDetails({ positionId, includeHistory: true });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  })();

  positionDetailsCache.set(positionId, promise);

  return await promise;
});
