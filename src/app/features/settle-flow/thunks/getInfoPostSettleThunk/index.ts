import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { SettleSimulationResults, simulateSettle } from '@voltz-protocol/sdk-v1-stateless';
import { simulateSettle as simulateSettleV2 } from '@voltz-protocol/sdk-v2';
import { InfoPostSettlePosition } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers';

export const getInfoPostSettlePositionThunkHandler: AsyncThunkPayloadCreator<
  Awaited<
    InfoPostSettlePosition | SettleSimulationResults | ReturnType<typeof rejectThunkWithError>
  >,
  {
    signer: providers.JsonRpcSigner | null;
  },
  { state: RootState }
> = async ({ signer }, thunkAPI) => {
  const state = thunkAPI.getState();
  const position = state.settleFlow.position;
  if (!position || !signer) {
    return {};
  }
  try {
    if (position.pool.isV2) {
      return await simulateSettleV2({
        positionId: position.id,
        signer,
      });
    } else {
      return await simulateSettle({
        positionId: position.id,
        signer,
      });
    }
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const getInfoPostSettlePositionThunk = createAsyncThunk<
  Awaited<
    InfoPostSettlePosition | SettleSimulationResults | ReturnType<typeof rejectThunkWithError>
  >,
  {
    signer: providers.JsonRpcSigner | null;
  },
  { state: RootState }
>('settleFlow/getInfoPostSettlePosition', getInfoPostSettlePositionThunkHandler);
