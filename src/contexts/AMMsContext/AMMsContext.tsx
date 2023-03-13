import { AMM } from '@voltz-protocol/v1-sdk';
import React, { createContext, useContext, useMemo, useRef } from 'react';

import { useAsyncFunction, UseAsyncFunctionResult } from '../../hooks/useAsyncFunction';

export type AMMsProviderProps = {};

export type AMMsContext = {
  variableApy: (amm: AMM) => UseAsyncFunctionResult<AMM, number | void>;
  fixedApr: (amm: AMM) => UseAsyncFunctionResult<AMM, number | void>;
};

const AMMsCtx = createContext<AMMsContext>({} as unknown as AMMsContext);
AMMsCtx.displayName = 'AMMContext';

export const AMMsProvider: React.FunctionComponent<AMMsProviderProps> = ({ children }) => {
  const variableApys = useRef<Record<string, number>>({});
  const fixedAprs = useRef<Record<string, number | undefined>>({});

  const useVariableApy = (amm: AMM) =>
    useAsyncFunction(
      async () => {
        if (variableApys.current[amm.id]) {
          return variableApys.current[amm.id];
        }
        if (amm) {
          const apy = await amm?.getInstantApy();
          variableApys.current[amm.id] = apy;
          return apy;
        }
        return 0;
      },
      useMemo(() => undefined, []),
    );

  const useFixedApr = (amm: AMM) =>
    useAsyncFunction(
      async () => {
        if (fixedAprs.current[amm.id]) {
          return fixedAprs.current[amm.id];
        }
        if (amm) {
          const apy = await amm?.getFixedApr();
          fixedAprs.current[amm.id] = apy;
          return apy;
        }
        return 0;
      },
      useMemo(() => undefined, []),
    );

  const value = {
    variableApy: useVariableApy,
    fixedApr: useFixedApr,
  };

  return <AMMsCtx.Provider value={value}>{children}</AMMsCtx.Provider>;
};

export const useAMMsContext = (): AMMsContext => {
  return useContext(AMMsCtx);
};
