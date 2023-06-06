import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPortfolioPositionDetails, PortfolioPositionDetails } from '@voltz-protocol/v1-sdk';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';

export const fetchPositionDetailsThunk = createAsyncThunk<
  Awaited<PortfolioPositionDetails | ReturnType<typeof rejectThunkWithError>>,
  {
    positionId: string;
  },
  { state: RootState }
>('positionDetails/fetchPositionDetails', async ({ positionId }, thunkAPI) => {
  try {
    return await getPortfolioPositionDetails(positionId);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
