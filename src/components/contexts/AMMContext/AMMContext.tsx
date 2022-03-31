import { createContext } from 'react';

import {
  MintMinimumMarginRequirementPayload,
  SwapMinimumMarginRequirementPayload,
  SwapInfoPayload,
  AMMDispatch,
} from './types';

const AMMContext = createContext<AMMDispatch>({
  variableApy: {
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
  swapMinimumMarginRequirement: {
    result: undefined,
    error: false,
    loading: false,
    call: (_args?: SwapMinimumMarginRequirementPayload) => undefined,
  },
  swapInfo: {
    result: undefined,
    error: false,
    loading: false,
    call: (_args?: SwapInfoPayload) => undefined,
  },
});

export default AMMContext;
