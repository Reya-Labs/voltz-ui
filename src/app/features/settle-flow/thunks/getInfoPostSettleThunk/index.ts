import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { SettleSimulationResults, simulateSettle } from '@voltz-protocol/sdk-v1-stateless';
import { InfoPostSettlePosition } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { isPortfolioNextEnabled } from '../../../../../utilities/isEnvVarProvided/is-portfolio-next-enabled';
import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';

export const getInfoPostSettlePositionThunkHandler: AsyncThunkPayloadCreator<
  Awaited<
    InfoPostSettlePosition | SettleSimulationResults | ReturnType<typeof rejectThunkWithError>
  >,
  {
    signer: providers.JsonRpcSigner | null;
  },
  { state: RootState }
> = async ({ signer }, thunkAPI) => {
  if (isPortfolioNextEnabled()) {
    const state = thunkAPI.getState();
    const position = state.settleFlow.positionDetails;
    if (!position || !signer) {
      return {};
    }
    try {
      return await simulateSettle({
        positionId: position.id,
        signer,
      });
    } catch (err) {
      return rejectThunkWithError(thunkAPI, err);
    }
  }

  // todo: FB deprecated after portfolio is released fully
  try {
    const position = thunkAPI.getState().settleFlow.position;
    const amm = position?.amm;
    if (!amm || !position) {
      return {};
    }

    return await amm.getInfoPostSettlePosition({
      fixedLow: position.fixedRateLower.toNumber(),
      fixedHigh: position.fixedRateUpper.toNumber(),
    });
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
