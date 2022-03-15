import { Agents } from '@components/contexts';

export type HandleSubmitSwapFormArgs = {
  agent?: Agents;
  fixedLow?: number;
  fixedHigh?: number;
  notional?: number;
  margin?: number;
  partialCollateralization?: boolean;
};
