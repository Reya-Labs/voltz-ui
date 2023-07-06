import { createAsyncThunk } from '@reduxjs/toolkit';
import { simulateRolloverWithLp } from '@voltz-protocol/sdk-v1-stateless';
import { simulateRolloverWithLp as simulateRolloverWithLpV2 } from '@voltz-protocol/sdk-v2';
import { InfoPostLp } from '@voltz-protocol/v1-sdk';

import { isV2AMM } from '../../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers';
import { isUserInputNotionalError } from '../../../../common';
import { initialState } from '../../state';
import {
  getProspectiveLpFixedHigh,
  getProspectiveLpFixedLow,
  getProspectiveLpMargin,
  getProspectiveLpNotional,
} from '../../utils';

export const getInfoPostLpThunk = createAsyncThunk<
  Awaited<
    | {
        notionalAmount: number;
        lpMode: 'add' | 'remove';
        infoPostLp: InfoPostLp;
        earlyReturn: boolean;
      }
    | ReturnType<typeof rejectThunkWithError>
  >,
  void,
  { state: RootState }
>('rolloverLpForm/getInfoPostLp', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState().rolloverLpForm;

    const fixedLow = getProspectiveLpFixedLow(state);
    const fixedHigh = getProspectiveLpFixedHigh(state);
    const notional = getProspectiveLpNotional(state);
    const margin = getProspectiveLpMargin(state);
    const previousAMM = state.previousAMM;
    const previousPosition = state.previousPosition;
    const amm = state.amm;

    if (fixedLow === null || fixedHigh === null) {
      return {
        notionalAmount: NaN,
        infoPostLp: {},
        earlyReturn: true,
      };
    }

    if (
      !amm ||
      !previousAMM ||
      !amm.signer ||
      !previousPosition ||
      isUserInputNotionalError(state)
    ) {
      return {
        notionalAmount: NaN,
        infoPostLp: {},
        earlyReturn: true,
      };
    }

    if (getProspectiveLpNotional(state) === 0) {
      return {
        notionalAmount: 0,
        infoPostLp: initialState.prospectiveLp.infoPostLp.value,
        earlyReturn: false,
      };
    }

    let prospectiveNotional: number = getProspectiveLpNotional(state);
    let addLiquidity: boolean = true;

    if (prospectiveNotional < 0) {
      addLiquidity = false;
      prospectiveNotional = -prospectiveNotional;
    }
    let infoPostLpV1: InfoPostLp;

    if (isV2AMM(amm)) {
      infoPostLpV1 = await simulateRolloverWithLpV2({
        maturedPositionId: previousPosition.id,
        ammId: amm.id,
        fixedLow,
        fixedHigh,
        notional,
        margin,
        signer: amm.signer,
      });
    } else {
      if (isV1StatelessEnabled()) {
        infoPostLpV1 = await simulateRolloverWithLp({
          maturedPositionId: previousPosition.id,
          ammId: amm.id,
          fixedLow,
          fixedHigh,
          notional,
          margin,
          signer: amm.signer,
        });
      } else {
        infoPostLpV1 = await amm.getInfoPostLp({
          addLiquidity: addLiquidity,
          notional: prospectiveNotional,
          fixedLow,
          fixedHigh,
        });
      }
    }

    return {
      prospectiveNotional,
      infoPostLp: infoPostLpV1,
      earlyReturn: false,
    };
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
