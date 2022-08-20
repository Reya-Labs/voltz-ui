import { useMemo } from "react";
import { Agents } from "@contexts";
import { MintMinimumMarginRequirementPayload, SwapInfoPayload, GetInfoType } from './types';
import { AugmentedAMM } from "@utilities";
import { InfoPostSwap, Position, PositionInfo } from "@voltz-protocol/v1-sdk/dist/types/entities";

import useAgent from "../useAgent";
import useAsyncFunction, { UseAsyncFunctionResult } from "../useAsyncFunction";

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
}

export const useAMM = (amm?: AugmentedAMM) => {
  const { agent } = useAgent();

  const ammCaps = useAsyncFunction(
    async () => {
      const result = await amm?.getCapPercentage();
      return result;
    },
    useMemo(() => undefined, [!!amm?.provider])
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

      const result = await amm?.getInfoPostMint({ ...args });

      return result;
    },
    useMemo(() => undefined, [!!amm?.signer]),
    100
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
      switch(args.type) {
        case GetInfoType.NORMAL_SWAP: {
          result = await amm?.getInfoPostSwap({
            position: args.position,
            isFT: agent === Agents.FIXED_TRADER,
            notional: args.notional,
            fixedRateLimit: args.fixedRateLimit,
            fixedLow: args.fixedLow ?? 1,
            fixedHigh: args.fixedHigh ?? 999,
            margin: args.margin
          }); 
          break;
        }

        case GetInfoType.FCM_SWAP: {
          result = await amm?.getInfoPostFCMSwap({notional: args.notional});
          break;
        }

        case GetInfoType.FCM_UNWIND: {
          result = await amm?.getInfoPostFCMUnwind({notionalToUnwind: args.notional});
          break;
        }

        default: {
          throw new Error("Unrecognized operation type");
        }
      }
      
      if (!result) {
        return;
      }

      return result;
    },
    useMemo(() => undefined, [!!amm?.signer, agent]),
    100
  );

  const variableApy = useAsyncFunction(
    (amm?.getInstantApy || Promise.reject).bind(amm),
    useMemo(() => undefined, [!!amm?.provider]),
  );

  return useMemo(() => ({
    ammCaps,
    fixedApr,
    mintMinimumMarginRequirement,
    positionInfo,
    swapInfo,
    variableApy,
  } as useAMMReturnType), 
  [
    ammCaps, 
    fixedApr, 
    mintMinimumMarginRequirement, 
    positionInfo,
    swapInfo,
    variableApy,
  ]);
}

export default useAMM;