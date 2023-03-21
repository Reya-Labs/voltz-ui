import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPositions,
  infoPostLpV1,
  Position,
  SupportedChainId,
} from '@voltz-protocol/v1-sdk';
import { BigNumber, ContractReceipt, providers } from 'ethers';

import { findCurrentPosition } from '../../../utilities/amm';
import { RootState } from '../../store';
import {
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

    return await amm.getPoolLpInfo();
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});

export const getInfoPostLpThunk = createAsyncThunk<
  Awaited<
    | {
        notionalAmount: number;
        // todo: not sure if we need 
        lpMode: 'add' | 'remove';
        infoPostLpV1: InfoPostLpV1;
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
        lpMode: getProspectiveLpMode(lpFormState),
        infoPostLp: {},
        earlyReturn: true,
      };
    }

    if (getProspectiveLpNotional(lpFormState) === 0) {
      return {
        notionalAmount: 0,
        lpMode: getProspectiveLpMode(lpFormState),
        infoPostLp: {
          marginRequirement: 0,
          maxMarginWithdrawable: 0,
          gasFeeETH: 0,
        },
        earlyReturn: false,
      };
    }

    const notionalAmount = getProspectiveLpNotional(lpFormState);
    // todo: fixedLow and fixedHigh needs to be fixed for lps to not be hardcoded
    const infoPostLpV1 = await amm.getInfoPostLpV1({
      isAdd: getProspectiveLpMode(lpFormState) === 'add',
      notional: notionalAmount,
      fixedLow: 1,
      fixedHigh: 999,
    });

    // margin requirement is collateral only now
  
    // todo: not sure what the commented logic below is trying to achieve
    // if (infoPostLpV1.marginRequirement > infoPostLpV1.fee) {
    //   infoPostLpV1.marginRequirement -= infoPostLpV1.fee;
    // } else {
    //   infoPostLpV1.marginRequirement = 0;
    // }

    return {
      notionalAmount,
      lpMode: getProspectiveLpMode(lpFormState),
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
      // todo: check if need to replace type with "LP"
      type: 'Trader',
    });
    if (error) {
      return rejectThunkWithError(thunkAPI, error);
    }
    const position = findCurrentPosition([], amm.id) || null;
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

    return await amm.mintOrBurn({
      // todo: mint and add are the same thing -> consider using unified terminology
      isMint: getProspectiveLpMode(lpFormState) === 'add',
      notional: getProspectiveLpNotional(lpFormState),
      margin: getProspectiveLpMargin(lpFormState),
      // todo: layer in fixed low and fixed high of the lp in here
      fixedLow: 1,
      fixedHigh: 999,
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

    return await amm.updatePositionMargin({
      // todo: update fixed low and fixed high in here
      fixedLow: 1,
      fixedHigh: 999,
      marginDelta: getProspectiveLpMargin(lpFormState),
    });
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
