import React, { createContext, useContext } from 'react';
import { useAMM } from '@hooks';
import { AMM } from '@voltz-protocol/v1-sdk';

export type AMMProviderProps = {
  amm: AMM;
};

export type AMMContext = ReturnType<typeof useAMM> & {
  amm: AMM;
};

const AMMCtx = createContext<AMMContext>({} as unknown as AMMContext);
AMMCtx.displayName = 'AMMContext';

export const AMMProvider: React.FunctionComponent<AMMProviderProps> = ({ amm, children }) => {
  const ammFuncs = useAMM(amm);

  const value = {
    amm,
    ...ammFuncs,
  };

  return <AMMCtx.Provider value={value}>{children}</AMMCtx.Provider>;
};

export const useAMMContext = (): AMMContext => {
  return useContext(AMMCtx);
};

export default AMMProvider;
