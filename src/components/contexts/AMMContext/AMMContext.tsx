import { createContext } from 'react';

import { MintMinimumMarginRequirementPayload, SwapInfoPayload, AMMDispatch, EstimatedCashflowPayload, CurrentMarginPayload } from './types';

const AMMContext = createContext<AMMDispatch>({
  variableApy: {
    result: undefined,
    error: false,
    loading: false,
    call: () => undefined,
  },
  fixedApr: {
    result: undefined,
    error: false,
    loading: false,
    call: () => undefined,
  },
  mintMinimumMarginRequirement: {
    result: undefined,
    error: false,
    loading: false,
    call: (_args?: MintMinimumMarginRequirementPayload) => undefined,
  },
  swapInfo: {
    result: undefined,
    error: false,
    loading: false,
    call: (_args?: SwapInfoPayload) => undefined,
  },
  estimatedCashflow: {
    result: undefined,
    error: false,
    loading: false,
    call: (_args?: EstimatedCashflowPayload) => undefined,
  },
  currentMargin: {
    result: undefined,
    error: false,
    loading: false,
    call: (_args?: CurrentMarginPayload) => undefined,
  },
});

export default AMMContext;
