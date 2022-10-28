import React from 'react';
import { useBorrowAMM } from '@hooks';
import { AugmentedBorrowAMM } from '@utilities';
import { createContext, useContext } from 'react';

export type BorrowAMMProviderProps = {
  amm: AugmentedBorrowAMM;
};

export type BorrowAMMContext = ReturnType<typeof useBorrowAMM> & {
  amm: AugmentedBorrowAMM;
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

export default BorrowAMMProvider;
