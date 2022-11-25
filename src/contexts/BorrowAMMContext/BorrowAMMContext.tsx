import React, { createContext, useContext } from 'react';
import { useBorrowAMM } from '../../hooks';
import { BorrowAMM } from '@voltz-protocol/v1-sdk';

export type BorrowAMMProviderProps = {
  amm: BorrowAMM;
};

export type BorrowAMMContext = ReturnType<typeof useBorrowAMM> & {
  amm: BorrowAMM;
};

const BorrowAMMCtx = createContext<BorrowAMMContext>({} as unknown as BorrowAMMContext);
BorrowAMMCtx.displayName = 'BorrowAMMContext';

export const BorrowAMMProvider: React.FunctionComponent<BorrowAMMProviderProps> = ({
  amm,
  children,
}) => {
  const ammFuncs = useBorrowAMM(amm);

  const value = {
    amm,
    ...ammFuncs,
  };

  return <BorrowAMMCtx.Provider value={value}>{children}</BorrowAMMCtx.Provider>;
};

export const useBorrowAMMContext = (): BorrowAMMContext => {
  return useContext(BorrowAMMCtx);
};
