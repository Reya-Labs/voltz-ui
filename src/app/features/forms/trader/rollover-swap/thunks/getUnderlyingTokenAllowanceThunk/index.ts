import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers';
import { getUnderlyingTokenAllowanceService } from '../../../../common';

export const getUnderlyingTokenAllowanceThunkHandler: AsyncThunkPayloadCreator<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  { chainId: SupportedChainId },
  { state: RootState }
> = async ({ chainId }, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().rolloverSwapForm.amm;
    return await getUnderlyingTokenAllowanceService({
      amm: amm!,
      signer: amm!.signer!,
      chainId,
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const getUnderlyingTokenAllowanceThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  { chainId: SupportedChainId },
  { state: RootState }
>('rolloverSwapForm/getUnderlyingTokenAllowance', getUnderlyingTokenAllowanceThunkHandler);
