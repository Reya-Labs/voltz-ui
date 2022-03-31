import React, { useMemo } from 'react';

import { AugmentedAMM } from '@utilities';
import { useAsyncFunction, useAgent } from '@hooks';
import { Agents } from '@components/contexts';
import {
  MintMinimumMarginRequirementPayload,
  SwapMinimumMarginRequirementPayload,
  SwapInfoPayload,
} from './types';
import AMMContext from './AMMContext';

export type AMMProviderProps = {
  amm: AugmentedAMM;
};

const AMMProvider: React.FunctionComponent<AMMProviderProps> = ({ amm, children }) => {
  const { agent } = useAgent();
  const variableApy = useAsyncFunction(
    amm.getVariableApy.bind(amm),
    useMemo(() => undefined, [!!amm.provider]),
  );
  const mintMinimumMarginRequirement = useAsyncFunction(
    async (args: MintMinimumMarginRequirementPayload) => {
      const recipient = await amm.signer?.getAddress();

      if (!recipient) {
        return;
      }

      return amm.getMinimumMarginRequirementPostMint({
        ...args,
        margin: 0,
      });
    },
    useMemo(() => undefined, [!!amm.signer]),
  );
  const swapMinimumMarginRequirement = useAsyncFunction(
    async (args: SwapMinimumMarginRequirementPayload) => {
      const recipient = await amm.signer?.getAddress();

      if (!recipient) {
        return;
      }

      const result = await amm.getInfoPostSwap({
        ...args,
        isFT: agent === Agents.FIXED_TRADER,
      });

      if (!result) {
        return;
      }

      return result.marginRequirement;
    },
    useMemo(() => undefined, [!!amm.signer, agent]),
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
  );

  const value = {
    variableApy,
    mintMinimumMarginRequirement,
    swapMinimumMarginRequirement,
    swapInfo,
  };

  return <AMMContext.Provider value={value}>{children}</AMMContext.Provider>;
};

export default AMMProvider;
