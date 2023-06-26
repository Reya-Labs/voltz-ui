import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { getTraderPositionByPool, Position, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
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
    const positions = await getTraderPositionByPool(amm.id, account, amm);
    const position = positions.length > 0 ? positions[0] : null;

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
