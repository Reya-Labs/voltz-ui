import { Position } from '@voltz-protocol/v1-sdk';
import { createContext } from 'react';

import { MintMinimumMarginRequirementPayload, SwapInfoPayload, AMMDispatch } from './types';

const AMMContext = createContext<AMMDispatch>({
  variableApy: {
    result: undefined,
    errorMessage: null,
    // error: false,
    loading: false,
    call: () => undefined,
  },
  fixedApr: {
    result: undefined,
    errorMessage: null,
    // error: false,
    loading: false,
    call: () => undefined,
  },
  mintMinimumMarginRequirement: {
    result: undefined,
    errorMessage: null,
    // error: false,
    loading: false,
    call: (_args?: MintMinimumMarginRequirementPayload) => undefined,
  },
  swapInfo: {
    result: undefined,
    errorMessage: null,
    // error: false,
    loading: false,
    call: (_args?: SwapInfoPayload) => undefined,
  },
  positionInfo: {
    result: undefined,
    errorMessage: null,
    // error: false,
    loading: false,
    call: (_args?: Position) => undefined,
  },
  ammCaps: {
    result: undefined,
    errorMessage: null,
    // error: false,
    loading: false,
    call: () => undefined,
  },
});

export default AMMContext;
