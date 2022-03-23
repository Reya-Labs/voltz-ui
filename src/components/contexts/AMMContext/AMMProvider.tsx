import React, { useMemo } from 'react';
import { AMM } from '@voltz/v1-sdk';

import { useAsyncFunction, useAgent } from '@hooks';
import { Agents } from '@components/contexts';
import { MintMinimumMarginRequirementPayload, SwapMinimumMarginRequirementPayload } from './types';
import AMMContext from './AMMContext';

export type AMMProviderProps = {
  amm: AMM;
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
        recipient,
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
        recipient,
      });

      if (!result) {
        return;
      }

      return result.marginRequirement;
    },
    useMemo(() => undefined, [!!amm.signer, agent]),
  );

  const value = {
    variableApy,
    mintMinimumMarginRequirement,
    swapMinimumMarginRequirement,
  };

  return <AMMContext.Provider value={value}>{children}</AMMContext.Provider>;
};

export default AMMProvider;
