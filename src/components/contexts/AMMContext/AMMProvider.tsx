import React, { useMemo } from 'react';

import { AugmentedAMM } from '@utilities';
import { useAsyncFunction, useAgent } from '@hooks';
import { Agents } from '@components/contexts';
import { MintMinimumMarginRequirementPayload, SwapInfoPayload } from './types';
import AMMContext from './AMMContext';
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';

export type AMMProviderProps = {
  amm: AugmentedAMM;
};

const AMMProvider: React.FunctionComponent<AMMProviderProps> = ({ amm, children }) => {
  const { agent } = useAgent();
  const variableApy = useAsyncFunction(
    amm.getVariableApy.bind(amm),
    useMemo(() => undefined, [!!amm.provider]),
  );
  const fixedApr = useAsyncFunction(
    amm.fixedApr.bind(amm),
    useMemo(() => undefined, [!!amm.provider]),
  );
  const mintMinimumMarginRequirement = useAsyncFunction(
    async (args: MintMinimumMarginRequirementPayload) => {
      const recipient = await amm.signer?.getAddress();

      if (!recipient) {
        return;
      }

      return amm.getInfoPostMint({ ...args });
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

      const result = await amm.getInfoPostSwap({
        ...args,
        isFT: agent === Agents.FIXED_TRADER,
        fixedLow: 1,
        fixedHigh: 2,
      });

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

  const value = {
    variableApy,
    fixedApr,
    mintMinimumMarginRequirement,
    swapInfo,
    positionInfo
  };

  return <AMMContext.Provider value={value}>{children}</AMMContext.Provider>;
};

export default AMMProvider;
