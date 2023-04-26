import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { getPositions, Position, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { findCurrentPosition } from '../../../../../../utilities/amm';
import { isBorrowingPosition } from '../../../../../../utilities/borrowAmm';
import { RootState } from '../../../../../store';
import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';
import { pushPageViewEvent } from '../../analytics';

export type SetSignerAndPositionForAMMThunkSuccess = {
  position: Position | null;
  signer: providers.JsonRpcSigner | null;
};

export const setSignerAndPositionForAMMThunkHandler: AsyncThunkPayloadCreator<
  Awaited<SetSignerAndPositionForAMMThunkSuccess | ReturnType<typeof rejectThunkWithError>>,
  { signer: providers.JsonRpcSigner | null; chainId: SupportedChainId },
  { state: RootState }
> = async ({ signer, chainId }, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().swapForm.amm;
    if (!amm) {
      return {
        signer: null,
        position: null,
      };
    }

    if (!signer) {
      pushPageViewEvent({
        account: '',
        isEdit: false,
      });
      return {
        signer: null,
        position: null,
      };
    }

    const account = await signer.getAddress();

    const { positions, error } = await getPositions({
      chainId,
      userWalletId: account.toLowerCase(),
      amms: [amm],
      type: 'Trader',
    });
    if (error) {
      return rejectThunkWithError(thunkAPI, error);
    }
    // TODO: Alex possible to move filter into subgraph level? Discuss
    const nonBorrowPositions = positions.filter((pos) => !isBorrowingPosition(pos));
    const position = findCurrentPosition(nonBorrowPositions || [], amm.id) || null;
    pushPageViewEvent({
      account,
      isEdit: Boolean(position),
    });
    return {
      position,
      signer,
    };
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const setSignerAndPositionForAMMThunk = createAsyncThunk<
  Awaited<SetSignerAndPositionForAMMThunkSuccess | ReturnType<typeof rejectThunkWithError>>,
  { signer: providers.JsonRpcSigner | null; chainId: SupportedChainId },
  { state: RootState }
>('swapForm/setSignerAndPositionForAMM', setSignerAndPositionForAMMThunkHandler);
