import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLpPositionsByPool, Position, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers';

export type SetSignerAndGetPositionsForLPThunkSuccess = {
  signer: providers.JsonRpcSigner | null;
  positions: Position[] | null;
};
export const setSignerAndGetPositionsForLPThunk = createAsyncThunk<
  Awaited<SetSignerAndGetPositionsForLPThunkSuccess | ReturnType<typeof rejectThunkWithError>>,
  { signer: providers.JsonRpcSigner | null; chainId: SupportedChainId },
  { state: RootState }
>('lpForm/setSignerAndPositionsForAMM', async ({ signer, chainId }, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().lpForm.amm;

    if (!amm) {
      return {
        signer: null,
        positions: null,
      };
    }

    if (!signer) {
      return {
        signer: null,
        positions: null,
      };
    }

    if (!chainId) {
      return {
        signer: null,
        positions: null,
      };
    }

    const userWalletId = (await signer.getAddress()).toLowerCase();
    const positions = await getLpPositionsByPool(amm.id, userWalletId, amm);
    return {
      signer: signer,
      positions,
    };
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
