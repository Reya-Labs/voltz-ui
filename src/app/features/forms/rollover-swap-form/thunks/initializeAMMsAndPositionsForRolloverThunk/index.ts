import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { AMM, getPositions, Position, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { getConfig } from '../../../../../../hooks/voltz-config/config';
import {
  findCurrentAmm,
  generateAmmIdForRoute,
  generatePoolId,
  generatePositionIdForRoute,
} from '../../../../../../utilities/amm';
import { RootState } from '../../../../../store';
import { rejectThunkWithError } from '../../../../helpers/reject-thunk-with-error';
import { pushPageViewEvent } from '../../analytics';

export type InitializeAMMsAndPositionsForRolloverThunkSuccess = {
  aMM: AMM | null;
  previousAMM: AMM | null;
  previousPosition: Position | null;
  signer: providers.JsonRpcSigner | null;
};

export const initializeAMMsAndPositionsForRolloverThunkHandler: AsyncThunkPayloadCreator<
  Awaited<
    InitializeAMMsAndPositionsForRolloverThunkSuccess | ReturnType<typeof rejectThunkWithError>
  >,
  {
    signer: providers.JsonRpcSigner | null;
    routePoolId: string;
    routeAmmId: string;
    routePositionId: string;
    chainId: SupportedChainId;
  },
  { state: RootState }
> = async ({ chainId, signer, routePoolId, routeAmmId, routePositionId }, thunkAPI) => {
  try {
    const account = signer ? await signer.getAddress() : '';
    pushPageViewEvent({
      account,
    });

    const aMMs = thunkAPI.getState().aMMs.aMMs[chainId];
    const aMMsLoadingState = thunkAPI.getState().aMMs.aMMsLoadedState[chainId];
    if (!aMMs || aMMs.length === 0 || aMMsLoadingState !== 'succeeded') {
      return {
        aMM: null,
        previousAMM: null,
        previousPosition: null,
        signer,
      };
    }
    const previousAMM = aMMs.find(
      (a) => routeAmmId === generateAmmIdForRoute(a) && routePoolId === generatePoolId(a),
    );
    if (!previousAMM) {
      return {
        aMM: null,
        previousAMM: null,
        previousPosition: null,
        signer,
      };
    }

    const { positions, error } = await getPositions({
      chainId,
      userWalletId: account.toLowerCase(),
      amms: [previousAMM],
      type: 'Trader',
    });
    if (error) {
      return rejectThunkWithError(thunkAPI, error);
    }
    const previousPosition = positions.find(
      (p) => generatePositionIdForRoute(p) === routePositionId,
    );
    if (!previousPosition) {
      return {
        aMM: null,
        previousAMM: null,
        previousPosition: null,
        signer,
      };
    }
    const config = getConfig(chainId);
    const pools = config ? config.pools : [];
    const aMM = findCurrentAmm(aMMs, pools, previousPosition);

    return {
      aMM,
      previousAMM,
      previousPosition,
      signer,
    };
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const initializeAMMsAndPositionsForRolloverThunk = createAsyncThunk<
  Awaited<
    InitializeAMMsAndPositionsForRolloverThunkSuccess | ReturnType<typeof rejectThunkWithError>
  >,
  {
    routePoolId: string;
    routeAmmId: string;
    routePositionId: string;
    signer: providers.JsonRpcSigner | null;
    chainId: SupportedChainId;
  },
  { state: RootState }
>(
  'rolloverSwapForm/initializeAMMsAndPositionsForRollover',
  initializeAMMsAndPositionsForRolloverThunkHandler,
);
