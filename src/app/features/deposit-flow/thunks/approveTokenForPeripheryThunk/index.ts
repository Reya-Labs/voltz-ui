import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { providers } from 'ethers';

import { RootState } from '../../../../store';
import { V2Pool } from '../../../aMMs';
import { approveTokenForPeripheryService } from '../../../forms/common';
import { rejectThunkWithError } from '../../../helpers';

export const approveTokenForPeripheryThunkHandler: AsyncThunkPayloadCreator<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  { signer: providers.JsonRpcSigner | null; tokenName: V2Pool['underlyingToken']['name'] },
  { state: RootState }
> = async ({ signer, tokenName }, thunkAPI) => {
  try {
    if (!tokenName || !signer) {
      return;
    }
    return await approveTokenForPeripheryService({
      tokenName,
      signer,
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const approveTokenForPeripheryThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  { signer: providers.JsonRpcSigner | null; tokenName: V2Pool['underlyingToken']['name'] },
  { state: RootState }
>('portfolio/approveTokenForPeripheryThunk', approveTokenForPeripheryThunkHandler);
