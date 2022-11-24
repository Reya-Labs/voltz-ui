import { useMemo } from 'react';
import { Agents } from '../../contexts';
import {
  ExpectedInfoPayload,
  GetInfoType,
  MintMinimumMarginRequirementPayload,
  SwapInfoPayload,
} from './types';
import { AMM, ExpectedApyInfo, InfoPostSwap, Position, PositionInfo } from '@voltz-protocol/v1-sdk';

import useAgent from '../useAgent';
import useAsyncFunction, { UseAsyncFunctionResult } from '../useAsyncFunction';

export type useAMMReturnType = {
  ammCaps: UseAsyncFunctionResult<unknown, number | void>;
  fixedApr: UseAsyncFunctionResult<unknown, number | void>;
  mintMinimumMarginRequirement: UseAsyncFunctionResult<
    MintMinimumMarginRequirementPayload,
    number | void
  >;
  positionInfo: UseAsyncFunctionResult<Position, PositionInfo | void>;
  swapInfo: UseAsyncFunctionResult<SwapInfoPayload, InfoPostSwap | void>;
  variableApy: UseAsyncFunctionResult<unknown, number | void>;
  expectedApyInfo: UseAsyncFunctionResult<ExpectedInfoPayload, ExpectedApyInfo | void>;
};

export const useAMM = (amm?: AMM) => {
  const { agent } = useAgent();

  const ammCaps = useAsyncFunction(
    async () => {
      return amm?.getCapPercentage();
    },
    useMemo(() => undefined, [!!amm?.provider]),
  );

  const fixedApr = useAsyncFunction(
    (amm?.getFixedApr || Promise.reject).bind(amm),
    useMemo(() => undefined, [!!amm?.provider]),
  );

  const mintMinimumMarginRequirement = useAsyncFunction(
    async (args: MintMinimumMarginRequirementPayload) => {
      const recipient = await amm?.signer?.getAddress();

      if (!recipient) {
        return;
      }

      return amm?.getInfoPostMint({ ...args });
    },
    useMemo(() => undefined, [!!amm?.signer]),
    100,
  );

  const positionInfo = useAsyncFunction(
    async (position: Position) => {
      const recipient = await amm?.signer?.getAddress();

      if (!recipient) {
        return;
      }

      const result = await amm?.getPositionInformation(position);

      if (!result) {
        return;
      }

      return result;
    },
    useMemo(() => undefined, [!!amm?.signer, agent]),
  );

  const swapInfo = useAsyncFunction(
    async (args: SwapInfoPayload) => {
      const recipient = await amm?.signer?.getAddress();

      if (!recipient) {
        return;
      }

      // hard coded values here are the defaults we use for traders, they overlap with a reasonable range (which causes confusion)
      let result: InfoPostSwap | undefined;
      switch (args.type) {
        case GetInfoType.NORMAL_SWAP: {
          result = await amm?.getInfoPostSwap({
            position: args.position,
            isFT: agent === Agents.FIXED_TRADER,
            notional: args.notional,
            fixedRateLimit: args.fixedRateLimit,
            fixedLow: args.fixedLow ?? 1,
            fixedHigh: args.fixedHigh ?? 999,
            margin: args.margin,
          });
          break;
        }

        default: {
          throw new Error('Unrecognized operation type');
        }
      }

      if (!result) {
        return;
      }

      return result;
    },
    useMemo(() => undefined, [!!amm?.signer, agent]),
    100,
  );

  const expectedApyInfo = useAsyncFunction(
    async (args: ExpectedInfoPayload) => {
      const recipient = await amm?.signer?.getAddress();

      if (!recipient) {
        return;
      }

      let result: ExpectedApyInfo | undefined = undefined;
      result = await amm?.getExpectedApyInfo({
        margin: args.margin,
        position: args.position,
        fixedLow: 1,
        fixedHigh: 999,
        fixedTokenDeltaUnbalanced: args.fixedTokenDeltaUnbalanced,
        availableNotional: args.availableNotional,
        predictedVariableApy: args.predictedVariableApy,
      });

      if (!result) {
        return;
      }

      return result;
    },
    useMemo(() => undefined, [!!amm?.signer]),
  );

  const variableApy = useAsyncFunction(
    (amm?.getInstantApy || Promise.reject).bind(amm),
    useMemo(() => undefined, [!!amm?.provider]),
  );

  return useMemo(
    () =>
      ({
        ammCaps,
        fixedApr,
        mintMinimumMarginRequirement,
        positionInfo,
        swapInfo,
        variableApy,
        expectedApyInfo,
      } as useAMMReturnType),
    [
      ammCaps,
      fixedApr,
      mintMinimumMarginRequirement,
      positionInfo,
      swapInfo,
      variableApy,
      expectedApyInfo,
    ],
  );
};
