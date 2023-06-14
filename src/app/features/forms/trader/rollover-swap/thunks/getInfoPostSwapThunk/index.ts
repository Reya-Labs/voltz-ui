import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { simulateRolloverWithSwap } from '@voltz-protocol/sdk-v1-stateless';
import { simulateRolloverWithSwap as simulateRolloverWithSwapV2 } from '@voltz-protocol/sdk-v2';
import { InfoPostSwapV1 } from '@voltz-protocol/v1-sdk';

import { isV2AMM } from '../../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import { isUserInputNotionalError } from '../../../../common/utils';
import { initialState } from '../../../swap/state';
import {
  getProspectiveSwapMargin,
  getProspectiveSwapMode,
  getProspectiveSwapNotional,
} from '../../utils';

export const getInfoPostSwapThunkHandler: AsyncThunkPayloadCreator<
  Awaited<
    | {
        notionalAmount: number;
        swapMode: 'fixed' | 'variable';
        infoPostSwap: InfoPostSwapV1;
        earlyReturn: boolean;
      }
    | ReturnType<typeof rejectThunkWithError>
  >,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState().rolloverSwapForm;
    const amm = state.amm;
    const previousAMM = state.previousAMM;
    const previousPosition = state.previousPosition;
    const prospectiveSwapMode = getProspectiveSwapMode(state);
    const prospectiveSwapNotional = getProspectiveSwapNotional(state);
    const prospectiveSwapMargin = getProspectiveSwapMargin(state);
    if (
      !amm ||
      !previousAMM ||
      !amm.signer ||
      !previousPosition ||
      isUserInputNotionalError(state)
    ) {
      return {
        notionalAmount: NaN,
        swapMode: prospectiveSwapMode,
        infoPostSwap: {},
        earlyReturn: true,
      };
    }

    if (prospectiveSwapNotional === 0) {
      return {
        notionalAmount: 0,
        swapMode: prospectiveSwapMode,
        infoPostSwap: initialState.prospectiveSwap.infoPostSwap.value,
        earlyReturn: false,
      };
    }

    const notionalAmount = prospectiveSwapNotional;
    let infoPostSwapV1: InfoPostSwapV1;

    if (isV2AMM(amm)) {
      infoPostSwapV1 = await simulateRolloverWithSwapV2({
        maturedPositionId: previousPosition.id,
        ammId: amm.id,
        notional: prospectiveSwapNotional,
        margin: prospectiveSwapMargin,
        signer: amm.signer,
      });
    } else {
      if (isV1StatelessEnabled()) {
        infoPostSwapV1 = await simulateRolloverWithSwap({
          maturedPositionId: previousPosition.id,
          ammId: amm.id,
          notional: prospectiveSwapNotional,
          margin: prospectiveSwapMargin,
          signer: amm.signer,
        });
      } else {
        infoPostSwapV1 = await amm.getInfoPostSwapV1({
          isFT: prospectiveSwapMode === 'fixed',
          notional: notionalAmount,
          fixedLow: 1,
          fixedHigh: 999,
        });
      }
    }

    // margin requirement is collateral only now
    if (infoPostSwapV1.marginRequirement > infoPostSwapV1.fee) {
      infoPostSwapV1.marginRequirement -= infoPostSwapV1.fee;
    } else {
      infoPostSwapV1.marginRequirement = 0;
    }

    return {
      notionalAmount,
      swapMode: prospectiveSwapMode,
      infoPostSwap: infoPostSwapV1,
      earlyReturn: false,
    };
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const getInfoPostSwapThunk = createAsyncThunk<
  Awaited<
    | {
        notionalAmount: number;
        swapMode: 'fixed' | 'variable';
        infoPostSwap: InfoPostSwapV1;
        earlyReturn: boolean;
      }
    | ReturnType<typeof rejectThunkWithError>
  >,
  void,
  { state: RootState }
>('rolloverSwapForm/getInfoPostSwap', getInfoPostSwapThunkHandler);
