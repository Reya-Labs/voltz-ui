import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { simulateEditSwap, simulateSwap } from '@voltz-protocol/sdk-v1-stateless';
import {
  simulateEditSwap as simulateEditSwapV2,
  simulateSwap as simulateSwapV2,
} from '@voltz-protocol/sdk-v2';
import { InfoPostSwapV1 } from '@voltz-protocol/v1-sdk';

import { isV2AMM } from '../../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers';
import { isUserInputNotionalError } from '../../../../common';
import { initialState } from '../../state';
import {
  getExistingPositionId,
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
    const swapFormState = thunkAPI.getState().swapForm;
    const amm = swapFormState.amm;
    const prospectiveSwapMode = getProspectiveSwapMode(swapFormState);
    const prospectiveSwapNotional = getProspectiveSwapNotional(swapFormState);
    const prospectiveSwapMargin = getProspectiveSwapMargin(swapFormState);
    if (!amm || isUserInputNotionalError(swapFormState)) {
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
    const notional = prospectiveSwapMode === 'fixed' ? -notionalAmount : notionalAmount;
    const positionId = getExistingPositionId(swapFormState);
    const isEdit = positionId !== null;

    let infoPostSwapV1: InfoPostSwapV1;
    if (isV2AMM(amm)) {
      if (isEdit) {
        infoPostSwapV1 = await simulateEditSwapV2({
          positionId,
          notional,
          margin: prospectiveSwapMargin,
          signer: amm.signer!,
        });
      } else {
        infoPostSwapV1 = await simulateSwapV2({
          ammId: amm.id,
          notional,
          margin: prospectiveSwapMargin,
          signer: amm.signer!,
        });
      }
    } else {
      if (isV1StatelessEnabled()) {
        if (isEdit) {
          infoPostSwapV1 = await simulateEditSwap({
            positionId,
            notional,
            margin: prospectiveSwapMargin,
            signer: amm.signer!,
          });
        } else {
          infoPostSwapV1 = await simulateSwap({
            ammId: amm.id,
            notional,
            margin: prospectiveSwapMargin,
            signer: amm.signer!,
          });
        }
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
>('swapForm/getInfoPostSwap', getInfoPostSwapThunkHandler);
