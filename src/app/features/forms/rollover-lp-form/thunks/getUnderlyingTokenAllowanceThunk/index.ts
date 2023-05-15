import { createAsyncThunk } from '@reduxjs/toolkit';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { getAlchemyKey } from '../../../../../../utilities/getAlchemyKey';
import { RootState } from '../../../../../store';
import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';

export const getUnderlyingTokenAllowanceThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  { chainId: SupportedChainId },
  { state: RootState }
>('rolloverLpForm/getUnderlyingTokenAllowance', async ({ chainId }, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().lpForm.amm;
    if (!amm || !amm.signer) {
      return;
    }

    return await amm.getUnderlyingTokenAllowance({
      forceErc20Check: false,
      chainId,
      alchemyApiKey: getAlchemyKey(),
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
