import { createContext } from 'react';

import { AMMDispatch } from './types';

const AMMContext = createContext<AMMDispatch>({
  loadVariableApy: () => null,
  variableApy: null,
  variableApyLoading: false,
  variableApyError: false,

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
