import { createContext } from 'react';

import { MintMinimumMarginRequirementPayload, SwapInfoPayload, AMMDispatch, PositionInfoPayload } from './types';

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
  positionInfo: {
    result: undefined,
    error: false,
    loading: false,
    call: (_args?: PositionInfoPayload) => undefined,
  },
});

export default AMMContext;
