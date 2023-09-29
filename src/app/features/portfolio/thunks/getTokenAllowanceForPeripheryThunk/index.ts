import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { providers } from 'ethers';

import { RootState } from '../../../../store';
import { V2Pool } from '../../../aMMs';
import { getTokenAllowanceForPeripheryService } from '../../../forms/common';
import { rejectThunkWithError } from '../../../helpers';

export const getTokenAllowanceForPeripheryThunkHandler: AsyncThunkPayloadCreator<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  { signer: providers.JsonRpcSigner | null; tokenName: V2Pool['underlyingToken']['name'] },
  { state: RootState }
> = async ({ signer, tokenName }, thunkAPI) => {
  try {
    if (!tokenName || !signer) {
      return 0;
    }
    return await getTokenAllowanceForPeripheryService({
      tokenName,
      signer,
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};
export const getTokenAllowanceForPeripheryThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  { signer: providers.JsonRpcSigner | null; tokenName: V2Pool['underlyingToken']['name'] },
  { state: RootState }
>('portfolio/getTokenAllowanceForPeripheryThunk', getTokenAllowanceForPeripheryThunkHandler);
