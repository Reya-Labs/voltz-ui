import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { InfoPostSettlePosition } from '@voltz-protocol/v1-sdk';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';

export const getInfoPostSettlePositionThunkHandler: AsyncThunkPayloadCreator<
  Awaited<
    | {
        infoPostSettlePosition: InfoPostSettlePosition;
      }
    | ReturnType<typeof rejectThunkWithError>
  >,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const position = thunkAPI.getState().settleFlow.position;
    const amm = position?.amm;
    if (!amm || !position) {
      return {};
    }

    const infoPostSettlePosition = await amm.getInfoPostSettlePosition({
      fixedLow: position.fixedRateLower.toNumber(),
      fixedHigh: position.fixedRateUpper.toNumber(),
    });

    return {
      infoPostSettlePosition,
    };
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const getInfoPostSettlePositionThunk = createAsyncThunk<
  Awaited<
    | {
        infoPostSettlePosition: InfoPostSettlePosition;
      }
    | ReturnType<typeof rejectThunkWithError>
  >,
  void,
  { state: RootState }
>('settleFlow/getInfoPostSettlePosition', getInfoPostSettlePositionThunkHandler);
