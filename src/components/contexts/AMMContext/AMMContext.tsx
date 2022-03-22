import { createContext } from 'react';

import { AMMDispatch } from './types';

const AMMContext = createContext<AMMDispatch>({
  variableApy: {
    result: undefined,
    error: false,
    loading: false,
    call: () => undefined,
  },

  loadMinimumMarginAmountMintBurn: () => null,
  minimumMarginAmountMintBurn: null,
  minimumMarginAmountMintBurnLoading: false,
  minimumMarginAmountMintBurnError: false,

  loadMinimumMarginAmountSwap: () => null,
  minimumMarginAmountSwap: null,
  minimumMarginAmountSwapLoading: false,
  minimumMarginAmountSwapError: false,
});

export default AMMContext;
