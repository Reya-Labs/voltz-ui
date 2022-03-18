import { createContext } from 'react';

import { AMMDispatch } from './types';

const AMMContext = createContext<AMMDispatch>({
  loadVariableApy: () => null,
  variableApy: null,
  variableApyLoading: false,
  variableApyError: false,

  loadMinimumMarginAmount: () => null,
  minimumMarginAmount: null,
  minimumMarginAmountLoading: false,
  minimumMarginAmountError: false,
});

export default AMMContext;
