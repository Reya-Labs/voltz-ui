import { createAsyncThunk } from '@reduxjs/toolkit';
import { InfoPostSwapV1 } from '@voltz-protocol/v1-sdk';

import { RootState } from '../../../../../store';
import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';
import { isUserInputNotionalError } from '../../../common/utils';
import { getProspectiveSwapMode, getProspectiveSwapNotional } from '../../utils';

export const getInfoPostSwapThunk = createAsyncThunk<
  Awaited<
    | {
        notionalAmount: number;
        swapMode: 'fixed' | 'variable';
        infoPostSwapV1: InfoPostSwapV1;
        earlyReturn: boolean;
      }
    | ReturnType<typeof rejectThunkWithError>
  >,
  void,
  { state: RootState }
>('swapForm/getInfoPostSwap', async (_, thunkAPI) => {
  try {
    const swapFormState = thunkAPI.getState().swapForm;
    const amm = swapFormState.amm;
    if (!amm || isUserInputNotionalError(swapFormState)) {
      return {
        notionalAmount: NaN,
        swapMode: getProspectiveSwapMode(swapFormState),
        infoPostSwap: {},
        earlyReturn: true,
      };
    }

    if (getProspectiveSwapNotional(swapFormState) === 0) {
      return {
        notionalAmount: 0,
        swapMode: getProspectiveSwapMode(swapFormState),
        infoPostSwap: {
          marginRequirement: 0,
          maxMarginWithdrawable: 0,
          averageFixedRate: 0,
          fixedTokenDeltaBalance: 0,
          variableTokenDeltaBalance: 0,
          fixedTokenDeltaUnbalanced: 0,
          fee: 0,
          slippage: 0,
          gasFeeETH: 0,
        },
        earlyReturn: false,
      };
    }

    const notionalAmount = getProspectiveSwapNotional(swapFormState);
    const infoPostSwapV1 = await amm.getInfoPostSwapV1({
      isFT: getProspectiveSwapMode(swapFormState) === 'fixed',
      notional: notionalAmount,
      fixedLow: 1,
      fixedHigh: 999,
    });

    // margin requirement is collateral only now
    if (infoPostSwapV1.marginRequirement > infoPostSwapV1.fee) {
      infoPostSwapV1.marginRequirement -= infoPostSwapV1.fee;
    } else {
      infoPostSwapV1.marginRequirement = 0;
    }

    return {
      notionalAmount,
      swapMode: getProspectiveSwapMode(swapFormState),
      infoPostSwap: infoPostSwapV1,
      earlyReturn: false,
    };
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
