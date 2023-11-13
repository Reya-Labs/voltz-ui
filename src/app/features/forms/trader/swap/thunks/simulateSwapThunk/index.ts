import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { Tokens } from '@voltz-protocol/api-sdk-v2';
import {
  simulateDepositAndSwapMarginAccount,
  simulateSwapMarginAccount,
  SimulateSwapMarginAccountResult,
} from '@voltz-protocol/sdk-v2';

import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers';
import { isUserInputNotionalError } from '../../../../common';
import { initialState } from '../../state';
import {
  getProspectiveSwapMode,
  getProspectiveSwapNotional,
  isDepositAndSwapFlow,
} from '../../utils';

export const simulateSwapHandler: AsyncThunkPayloadCreator<
  Awaited<
    | {
        notionalAmount: number;
        swapMode: 'fixed' | 'variable';
        infoPostSwap: SimulateSwapMarginAccountResult;
        earlyReturn: boolean;
      }
    | ReturnType<typeof rejectThunkWithError>
  >,
  { deposit?: { amount: number; token: Tokens } },
  { state: RootState }
> = async ({ deposit }, thunkAPI) => {
  try {
    const swapFormState = thunkAPI.getState().swapForm;
    const { pool, signer, marginAccount } = swapFormState;
    const prospectiveSwapMode = getProspectiveSwapMode(swapFormState);
    const prospectiveSwapNotional = getProspectiveSwapNotional(swapFormState);
    if (!pool || !marginAccount || !signer || isUserInputNotionalError(swapFormState)) {
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
        infoPostSwap: initialState.prospectiveSwap.swapSimulation.value,
        earlyReturn: false,
      };
    }

    const notionalAmount = prospectiveSwapNotional;
    const notional = prospectiveSwapMode === 'fixed' ? -notionalAmount : notionalAmount;

    const infoPostSwapV1 =
      isDepositAndSwapFlow(swapFormState) && deposit
        ? await simulateDepositAndSwapMarginAccount({
            ammId: pool.id,
            notional,
            signer,
            marginAccountId: marginAccount.id,
            deposit,
          })
        : await simulateSwapMarginAccount({
            ammId: pool.id,
            notional,
            signer,
            marginAccountId: marginAccount.id,
          });

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

export const simulateSwapThunk = createAsyncThunk<
  Awaited<
    | {
        notionalAmount: number;
        swapMode: 'fixed' | 'variable';
        infoPostSwap: SimulateSwapMarginAccountResult;
        earlyReturn: boolean;
      }
    | ReturnType<typeof rejectThunkWithError>
  >,
  { deposit?: { amount: number; token: Tokens } },
  { state: RootState }
>('swapForm/simulateSwap', simulateSwapHandler);
