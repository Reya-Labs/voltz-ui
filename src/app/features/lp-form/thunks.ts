import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPositions, InfoPostLp, Position, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { BigNumber, ContractReceipt, providers } from 'ethers';

import { findCurrentPositionLp } from '../../../utilities/amm';
import { RootState } from '../../store';
import {
  getProspectiveLpAddLiquidity,
  getProspectiveLpFixedHigh,
  getProspectiveLpFixedLow,
  getProspectiveLpMargin,
  getProspectiveLpNotional,
  isUserInputNotionalError,
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
      return;
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

    const allowance = await amm.getUnderlyingTokenAllowance({
      forceErc20Check: false,
      chainId,
      alchemyApiKey,
    });

    if (allowance.gt(BigNumber.from(Number.MAX_SAFE_INTEGER.toString()))) {
      return Number.MAX_SAFE_INTEGER;
    }

    return Number(allowance.toString());
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

    return await amm.approveUnderlyingTokenForPeriphery();
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const getFixedRateThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('lpForm/getFixedRate', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().lpForm.amm;
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
  void,
  { state: RootState }
>('lpForm/getVariableRate', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().lpForm.amm;
    if (!amm) {
      return;
    }

    const variableRate = await amm.getInstantApy();
    return variableRate * 100;
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const getVariableRate24hAgoThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('lpForm/getVariableRate24hAgo', async (_, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().lpForm.amm;
    if (!amm) {
      return;
    }
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const variableRate = await amm.getInstantApy(Date.now() - oneDayInMilliseconds);
    return variableRate * 100;
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

    return await amm.getPoolLpInfo(
      getProspectiveLpFixedLow(lpFormState),
      getProspectiveLpFixedHigh(lpFormState),
    );
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

    const notionalAmount: number = getProspectiveLpNotional(lpFormState);
    // todo: fixedLow and fixedHigh needs to be fixed for lps to not be hardcoded
    // todo: make isAdd dynamic
    const infoPostLpV1 = await amm.getInfoPostLp({
      addLiquidity: true,
      notional: notionalAmount,
      fixedLow: 1,
      fixedHigh: 999,
    });

    // margin requirement is collateral only now

    // todo: Artur not sure what the commented logic below is trying to achieve
    // if (infoPostLpV1.marginRequirement > infoPostLpV1.fee) {
    //   infoPostLpV1.marginRequirement -= infoPostLpV1.fee;
    // } else {
    //   infoPostLpV1.marginRequirement = 0;
    // }

    return {
      notionalAmount,
      infoPostLp: infoPostLpV1,
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
>('lpForm/setSignerAndPositionForAMM', async ({ signer, chainId }, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().lpForm.amm;
    const fixedLower = thunkAPI.getState().lpForm.userInput.fixedLower;
    const fixedUpper = thunkAPI.getState().lpForm.userInput.fixedUpper;

    if (!fixedLower) {
      return {
        signer: null,
        position: null,
      };
    }

    if (!fixedUpper) {
      return {
        signer: null,
        position: null,
      };
    }

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

    const { positions, error } = await getPositions({
      chainId,
      userWalletId: userWalletId,
      amms: [amm],
      type: 'LP',
    });

    if (error) {
      return rejectThunkWithError(thunkAPI, error);
    }
    const position = findCurrentPositionLp(positions || [], amm.id, fixedLower, fixedUpper) || null;
    return {
      position,
      signer,
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

    return await amm.lp({
      addLiquidity: getProspectiveLpAddLiquidity(lpFormState),
      notional: getProspectiveLpNotional(lpFormState),
      margin: getProspectiveLpMargin(lpFormState),
      fixedLow: getProspectiveLpFixedLow(lpFormState),
      fixedHigh: getProspectiveLpFixedHigh(lpFormState),
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
    if (!amm || !lpFormState.position.value) {
      return;
    }

    const fixedLow: number = getProspectiveLpFixedLow(lpFormState);
    const fixedHigh: number = getProspectiveLpFixedHigh(lpFormState);

    return await amm.updatePositionMargin({
      fixedLow,
      fixedHigh,
      marginDelta: getProspectiveLpMargin(lpFormState),
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
