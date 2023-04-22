import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPositions, InfoPostLp, Position, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { ContractReceipt, providers } from 'ethers';

import { findCurrentPositionsLp } from '../../../utilities/amm';
import { RootState } from '../../store';
import { isUserInputNotionalError } from '../common-form/utils';
import {
  getDefaultLpFixedHigh,
  getDefaultLpFixedLow,
  getProspectiveLpFixedHigh,
  getProspectiveLpFixedLow,
  getProspectiveLpMargin,
  getProspectiveLpNotional,
} from './utils';

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
>('lpForm/getWalletBalance', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().lpForm.amm;
    if (!amm || !amm.signer) {
      return 0;
    }

    return await amm.underlyingTokens();
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const getUnderlyingTokenAllowanceThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  { chainId: SupportedChainId; alchemyApiKey: string },
  { state: RootState }
>('lpForm/getUnderlyingTokenAllowance', async ({ chainId, alchemyApiKey }, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().lpForm.amm;
    if (!amm || !amm.signer) {
      return;
    }

    return await amm.getUnderlyingTokenAllowance({
      forceErc20Check: false,
      chainId,
      alchemyApiKey,
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const approveUnderlyingTokenThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('lpForm/approveUnderlyingToken', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().lpForm.amm;
    if (!amm || !amm.signer) {
      return;
    }

    return await amm.approveUnderlyingTokenForPeripheryV1();
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const getPoolLpInfoThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('lpForm/getPoolLpInfo', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().lpForm.amm;
    if (!amm) {
      return;
    }

    const lpFormState = thunkAPI.getState().lpForm;

    let fixedLow: number | null = getProspectiveLpFixedLow(lpFormState);
    let fixedHigh: number | null = getProspectiveLpFixedHigh(lpFormState);

    if (fixedLow === null || fixedHigh === null) {
      fixedLow = getDefaultLpFixedLow(lpFormState);
      fixedHigh = getDefaultLpFixedHigh(lpFormState);
    }

    return await amm.getPoolLpInfo(fixedLow, fixedHigh);
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const getInfoPostLpThunk = createAsyncThunk<
  Awaited<
    | {
        notionalAmount: number;
        lpMode: 'add' | 'remove';
        infoPostLpV1: InfoPostLp;
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
        infoPostLp: {
          marginRequirement: 0,
          maxMarginWithdrawable: 0,
          gasFeeETH: 0,
        },
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

export type SetSignerAndPositionsForAMMThunkSuccess = {
  signer: providers.JsonRpcSigner | null;
  positions: Position[] | null;
};

export const setSignerAndPositionsForAMMThunk = createAsyncThunk<
  Awaited<SetSignerAndPositionsForAMMThunkSuccess | ReturnType<typeof rejectThunkWithError>>,
  { signer: providers.JsonRpcSigner | null; chainId: SupportedChainId },
  { state: RootState }
>('lpForm/setSignerAndPositionsForAMM', async ({ signer, chainId }, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().lpForm.amm;

    if (!amm) {
      return {
        signer: null,
        positions: null,
      };
    }

    if (!signer) {
      return {
        signer: null,
        positions: null,
      };
    }

    if (!chainId) {
      return {
        signer: null,
        positions: null,
      };
    }

    const userWalletId = (await signer.getAddress()).toLowerCase();

    const { positions, error } = await getPositions({
      chainId,
      userWalletId: userWalletId,
      amms: [amm],
      type: 'LP',
    });

    if (error) {
      return rejectThunkWithError(thunkAPI, error);
    }

    if (positions.length === 0) {
      return {
        signer: signer,
        positions: positions,
      };
    }

    const filteredPositions: Position[] = findCurrentPositionsLp(positions || [], amm.id) || null;
    return {
      signer: signer,
      positions: filteredPositions,
    };
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const confirmLpThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('lpForm/confirmLp', async (_, thunkAPI) => {
  try {
    const lpFormState = thunkAPI.getState().lpForm;
    const amm = lpFormState.amm;
    if (!amm) {
      return;
    }

    const fixedLow = getProspectiveLpFixedLow(lpFormState);
    const fixedHigh = getProspectiveLpFixedHigh(lpFormState);

    if (fixedLow === null || fixedHigh === null) {
      return;
    }

    let prospectiveNotional: number = getProspectiveLpNotional(lpFormState);
    let addLiquidity: boolean = true;

    if (prospectiveNotional < 0) {
      addLiquidity = false;
      prospectiveNotional = -prospectiveNotional;
    }

    return await amm.lp({
      addLiquidity: addLiquidity,
      notional: prospectiveNotional,
      margin: getProspectiveLpMargin(lpFormState),
      fixedLow: fixedLow,
      fixedHigh: fixedHigh,
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const confirmMarginUpdateThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('lpForm/confirmMarginUpdate', async (_, thunkAPI) => {
  try {
    const lpFormState = thunkAPI.getState().lpForm;
    const amm = lpFormState.amm;

    if (!amm) {
      return;
    }

    if (!lpFormState.selectedPosition) {
      return;
    }

    const fixedLow: number | null = getProspectiveLpFixedLow(lpFormState);
    const fixedHigh: number | null = getProspectiveLpFixedHigh(lpFormState);

    if (fixedLow === null || fixedHigh === null) {
      return;
    }

    return await amm.updatePositionMargin({
      fixedLow,
      fixedHigh,
      marginDelta: getProspectiveLpMargin(lpFormState),
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
