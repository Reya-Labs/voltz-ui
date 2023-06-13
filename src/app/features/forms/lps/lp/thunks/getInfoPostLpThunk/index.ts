import { createAsyncThunk } from '@reduxjs/toolkit';
import { simulateEditLp, simulateLp } from '@voltz-protocol/sdk-v1-stateless';
import { InfoPostLp } from '@voltz-protocol/v1-sdk';

import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import { isUserInputNotionalError } from '../../../../common/utils';
import { initialState } from '../../state';
import { getProspectiveLpMargin, getProspectiveLpNotional } from '../../utils';

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

    const fixedLow = lpFormState.userInput.fixedRange.lower;
    const fixedHigh = lpFormState.userInput.fixedRange.upper;

    if (fixedLow === null || fixedHigh === null) {
      return {
        notionalAmount: NaN,
        infoPostLp: {},
        earlyReturn: true,
      };
    }

    const amm = lpFormState.amm;
    if (!amm || !amm.signer || isUserInputNotionalError(lpFormState)) {
      return {
        notionalAmount: NaN,
        infoPostLp: {},
        earlyReturn: true,
      };
    }

    let notional: number = getProspectiveLpNotional(lpFormState);
    if (notional === 0) {
      return {
        notionalAmount: 0,
        infoPostLp: initialState.prospectiveLp.infoPostLp.value,
        earlyReturn: false,
      };
    }
    const margin = getProspectiveLpMargin(lpFormState);
    const selectedPosition = lpFormState.selectedPosition;
    const positionId = selectedPosition?.id;
    const isEdit = Boolean(selectedPosition);

    let addLiquidity: boolean = true;

    if (notional < 0) {
      addLiquidity = false;
      notional = -notional;
    }

    let result: InfoPostLp;

    if (isV1StatelessEnabled()) {
      if (isEdit) {
        result = await simulateEditLp({
          positionId: positionId!,
          notional,
          margin,
          signer: amm.signer,
        });
      } else {
        result = await simulateLp({
          ammId: amm.id,
          fixedLow,
          fixedHigh,
          notional,
          margin,
          signer: amm.signer,
        });
      }
    } else {
      result = await amm.getInfoPostLp({
        addLiquidity: addLiquidity,
        notional,
        fixedLow,
        fixedHigh,
      });
    }

    return {
      prospectiveNotional: notional,
      infoPostLp: result,
      earlyReturn: false,
    };
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
