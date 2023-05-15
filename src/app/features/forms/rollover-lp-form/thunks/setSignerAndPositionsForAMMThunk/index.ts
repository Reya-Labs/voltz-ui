import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPositions, Position, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { findCurrentPositionsLp } from '../../../../../../utilities/amm';
import { RootState } from '../../../../../store';
import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';

export type SetSignerAndPositionsForAMMThunkSuccess = {
  signer: providers.JsonRpcSigner | null;
  positions: Position[] | null;
};
export const setSignerAndPositionsForAMMThunk = createAsyncThunk<
  Awaited<SetSignerAndPositionsForAMMThunkSuccess | ReturnType<typeof rejectThunkWithError>>,
  { signer: providers.JsonRpcSigner | null; chainId: SupportedChainId },
  { state: RootState }
>('rolloverLpForm/setSignerAndPositionsForAMM', async ({ signer, chainId }, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().rolloverLpForm.amm;

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

    const { positions, error } = await getPositions({
      chainId,
      userWalletId: userWalletId,
      amms: [amm],
      type: 'LP',
    });

    if (error) {
      return rejectThunkWithError(thunkAPI, error);
    }

    if (positions.length === 0) {
      return {
        signer: signer,
        positions: positions,
      };
    }

    const filteredPositions: Position[] = findCurrentPositionsLp(positions || [], amm.id) || null;
    return {
      signer: signer,
      positions: filteredPositions,
    };
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
