import { createContext } from 'react';

import {
  MintMinimumMarginRequirementPayload,
  SwapMinimumMarginRequirementPayload,
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
});

export default AMMContext;
