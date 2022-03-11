import { Agents } from '@components/contexts';

export type HandleSubmitPoolFormArgs = {
  agent?: Agents;
  fixedLow?: number;
  fixedHigh?: number;
  margin?: number;
  leverage?: number;
  partialCollateralization?: boolean;
};
