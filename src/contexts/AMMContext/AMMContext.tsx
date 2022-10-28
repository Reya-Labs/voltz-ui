import React from 'react';
import { useAMM } from '@hooks';
import { AugmentedAMM } from '@utilities';
import { createContext, useContext } from 'react';

export type AMMProviderProps = {
  amm: AugmentedAMM;
};

export type AMMContext = ReturnType<typeof useAMM> & {
  amm: AugmentedAMM;
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
