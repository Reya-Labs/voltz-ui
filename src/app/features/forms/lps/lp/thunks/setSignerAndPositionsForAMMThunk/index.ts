import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLpPositionByPool, Position, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { findCurrentPositionsLp } from '../../../../../../../utilities/amm';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';

export type SetSignerAndPositionsForAMMThunkSuccess = {
  signer: providers.JsonRpcSigner | null;
  positions: Position[] | null;
};
export const setSignerAndPositionsForAMMThunk = createAsyncThunk<
  Awaited<SetSignerAndPositionsForAMMThunkSuccess | ReturnType<typeof rejectThunkWithError>>,
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
    const positions = await getLpPositionByPool(amm.id, userWalletId, amm);

    const filteredPositions: Position[] = findCurrentPositionsLp(positions || [], amm.id) || null;
    return {
      signer: signer,
      positions: filteredPositions,
    };
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
