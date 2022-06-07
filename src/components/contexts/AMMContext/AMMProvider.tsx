import React, { useMemo } from 'react';

import { AugmentedAMM } from '@utilities';
import { useAsyncFunction, useAgent } from '@hooks';
import { Agents } from '@components/contexts';
import { GetInfoType, MintMinimumMarginRequirementPayload, SwapInfoPayload } from './types';
import AMMContext from './AMMContext';
import { InfoPostSwap, Position } from '@voltz-protocol/v1-sdk/dist/types/entities';

export type AMMProviderProps = {
  amm: AugmentedAMM;
};

const AMMProvider: React.FunctionComponent<AMMProviderProps> = ({ amm, children }) => {
  const { agent } = useAgent();
  const variableApy = useAsyncFunction(
    amm.getInstantApy.bind(amm),
    useMemo(() => undefined, [!!amm.provider]),
  );
  const fixedApr = useAsyncFunction(
    amm.getFixedApr.bind(amm),
    useMemo(() => undefined, [!!amm.provider]),
  );
  const mintMinimumMarginRequirement = useAsyncFunction(
    async (args: MintMinimumMarginRequirementPayload) => {
      const recipient = await amm.signer?.getAddress();

      if (!recipient) {
        return;
      }

      const result = await amm.getInfoPostMint({ ...args });

      return result;
    },
    useMemo(() => undefined, [!!amm.signer]),
    100
  );
  const swapInfo = useAsyncFunction(
    async (args: SwapInfoPayload) => {
      const recipient = await amm.signer?.getAddress();

      if (!recipient) {
        return;
      }

      // hard coded values here are the defaults we use for traders, they overlap with a reasonable range (which causes confusion)
      let result: InfoPostSwap;
      switch(args.type) {
        case GetInfoType.NORMAL_SWAP: {
          result = await amm.getInfoPostSwap({
            ...args,
            isFT: agent === Agents.FIXED_TRADER,
            fixedLow: 1,
            fixedHigh: 999,
          }); 
          break;
        }

        case GetInfoType.FCM_SWAP: {
          result = await amm.getInfoPostFCMSwap({notional: args.notional});
          break;
        }

        case GetInfoType.FCM_UNWIND: {
          result = await amm.getInfoPostFCMUnwind({notionalToUnwind: args.notional});
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
    useMemo(() => undefined, [!!amm.signer, agent]),
    100
  );

  const positionInfo = useAsyncFunction(
    async (position: Position) => {
      const recipient = await amm.signer?.getAddress();

      if (!recipient) {
        return;
      }

      const result = await amm.getPositionInformation(position);

      if (!result) {
        return;
      }

      return result;
    },
    useMemo(() => undefined, [!!amm.signer, agent]),
  );

  const ammCaps = useAsyncFunction(
    async () => {
      const result = await amm.getCapPercentage();
      return result;
    },
    useMemo(() => undefined, [!!amm.provider])
  );

  const value = {
    variableApy,
    fixedApr,
    mintMinimumMarginRequirement,
    swapInfo,
    positionInfo,
    ammCaps
  };

  return <AMMContext.Provider value={value}>{children}</AMMContext.Provider>;
};

export default AMMProvider;
