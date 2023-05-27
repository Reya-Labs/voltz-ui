import { createAsyncThunk } from '@reduxjs/toolkit';
import { InfoPostLp } from '@voltz-protocol/v1-sdk';

import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import { isUserInputNotionalError } from '../../../../common/utils';
import { initialState } from '../../state';
import { getProspectiveLpNotional } from '../../utils';

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
>('lpForm/getInfoPostLp', async (_, thunkAPI) => {
  try {
    const lpFormState = thunkAPI.getState().lpForm;

    const fixedLower = lpFormState.userInput.fixedRange.lower;
    const fixedUpper = lpFormState.userInput.fixedRange.upper;

    if (fixedLower === null || fixedUpper === null) {
      return {
        notionalAmount: NaN,
        infoPostLp: {},
        earlyReturn: true,
      };
    }

    const amm = lpFormState.amm;
    if (!amm || isUserInputNotionalError(lpFormState)) {
      return {
        notionalAmount: NaN,
        infoPostLp: {},
        earlyReturn: true,
      };
    }

    if (getProspectiveLpNotional(lpFormState) === 0) {
      return {
        notionalAmount: 0,
        infoPostLp: initialState.prospectiveLp.infoPostLp.value,
        earlyReturn: false,
      };
    }

    let prospectiveNotional: number = getProspectiveLpNotional(lpFormState);
    let addLiquidity: boolean = true;

    if (prospectiveNotional < 0) {
      addLiquidity = false;
      prospectiveNotional = -prospectiveNotional;
    }

    const infoPostLpV1: InfoPostLp = await amm.getInfoPostLp({
      addLiquidity: addLiquidity,
      notional: prospectiveNotional,
      fixedLow: fixedLower,
      fixedHigh: fixedUpper,
    });

    return {
      prospectiveNotional,
      infoPostLp: infoPostLpV1,
      earlyReturn: false,
    };
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
