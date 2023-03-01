import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPositionsV1, InfoPostSwapV1, Position, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { findCurrentPosition } from '../../../utilities/amm';
import { isBorrowingPosition } from '../../../utilities/borrowAmm';
import { stringToBigFloat } from '../../../utilities/number';
import { RootState } from '../../store';
import { isNotionalStrictlyPositive } from './utils';

const rejectThunkWithError = (
  thunkAPI: {
    rejectWithValue: (value: string | undefined) => unknown;
  },
  err: unknown,
) => {
  if (typeof err === 'string') {
    return thunkAPI.rejectWithValue(err);
  }
  return thunkAPI.rejectWithValue((err as Error)?.message);
};

export const getWalletBalanceThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/getWalletBalance', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().swapForm.amm;
    if (!amm) {
      return;
    }

    return await amm.underlyingTokens();
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const getFixedRateThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/getFixedRate', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().swapForm.amm;
    if (!amm) {
      return;
    }

    return await amm.getFixedApr();
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const getVariableRateThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  { timestampInMS?: number },
  { state: RootState }
>('swapForm/getVariableRate', async ({ timestampInMS }, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().swapForm.amm;
    if (!amm) {
      return;
    }

    const variableRate = await amm.getInstantApy(timestampInMS);
    return variableRate * 100;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const getPoolSwapInfoThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/getPoolSwapInfo', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().swapForm.amm;
    if (!amm) {
      return;
    }

    return await amm.getPoolSwapInfo();
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const initialiseCashflowCalculatorThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/initialiseCashFlowCalculator', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().swapForm.amm;
    if (!amm) {
      return;
    }
    const { scaled: variableFactor } = await amm.variableFactor(
      amm.termStartTimestampInMS,
      Date.now(),
    );

    return variableFactor;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const getInfoPostSwapThunk = createAsyncThunk<
  Awaited<
    | { notionalAmount: number; infoPostSwapV1: InfoPostSwapV1; earlyReturn: boolean }
    | ReturnType<typeof rejectThunkWithError>
  >,
  void,
  { state: RootState }
>('swapForm/getInfoPostSwap', async (_, thunkAPI) => {
  try {
    const swapFormState = thunkAPI.getState().swapForm;
    const amm = swapFormState.amm;
    if (!amm || !isNotionalStrictlyPositive(swapFormState)) {
      return {
        notionalAmount: NaN,
        infoPostSwap: {},
        earlyReturn: true,
      };
    }

    const notionalAmount = stringToBigFloat(swapFormState.prospectiveSwap.notionalAmount.value);
    const infoPostSwapV1 = await amm.getInfoPostSwapV1({
      isFT: swapFormState.prospectiveSwap.mode === 'fixed',
      notional: notionalAmount,
      fixedLow: 1,
      fixedHigh: 999,
    });

    return {
      notionalAmount,
      infoPostSwap: infoPostSwapV1,
      earlyReturn: false,
    };
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export type SetSignerAndPositionForAMMThunkSuccess = {
  position: Position | null;
  signer: providers.JsonRpcSigner | null;
};
export const setSignerAndPositionForAMMThunk = createAsyncThunk<
  Awaited<SetSignerAndPositionForAMMThunkSuccess | ReturnType<typeof rejectThunkWithError>>,
  { signer: providers.JsonRpcSigner | null; chainId: SupportedChainId },
  { state: RootState }
>('swapForm/setSignerAndPositionForAMM', async ({ signer, chainId }, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().swapForm.amm;
    if (!amm) {
      return {
        signer: null,
        position: null,
      };
    }

    if (!signer) {
      return {
        signer: null,
        position: null,
      };
    }

    const userWalletId = (await signer.getAddress()).toLowerCase();

    const { positions, error } = await getPositionsV1({
      chainId,
      userWalletId: userWalletId,
      amms: [amm],
      type: 'Trader',
    });
    if (error) {
      return rejectThunkWithError(thunkAPI, error);
    }
    // TODO: Alex possible to move filter into subgraph level? Discuss
    const nonBorrowPositions = positions.filter((pos) => !isBorrowingPosition(pos));
    const position = findCurrentPosition(nonBorrowPositions || [], amm.id);
    return {
      position,
      signer,
    };
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const confirmSwapThunk = createAsyncThunk<
  Awaited<void | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/confirmSwap', async (_, thunkAPI) => {
  try {
    const swapFormState = thunkAPI.getState().swapForm;
    const amm = swapFormState.amm;
    if (!amm) {
      return;
    }
    const fakeError = Math.random() * 100 < 25;
    // todo: Alex integrate proper SDK here and remove the timeout mocking
    if (fakeError) {
      await new Promise((resolve, reject) =>
        setTimeout(() => reject('Error happened during the swap!'), 5000),
      );
    } else {
      await new Promise((resolve) => setTimeout(() => resolve(undefined), 5000));
    }
    return undefined;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
