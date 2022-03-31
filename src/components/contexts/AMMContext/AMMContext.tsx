import { createContext } from 'react';

import { MintMinimumMarginRequirementPayload, SwapInfoPayload, AMMDispatch } from './types';

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
  swapInfo: {
    result: undefined,
    error: false,
    loading: false,
    call: (_args?: SwapInfoPayload) => undefined,
  },
});

export default AMMContext;
