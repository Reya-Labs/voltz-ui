import { pushEvent } from '../../../../../utilities/googleAnalytics';

type EstimatedApyChangeEventParams = {
  estimatedApy: number;
  pool: string;
  isFT: boolean;
  account: string;
};
export const pushEstimatedApyChangeEvent = ({
  account,
  estimatedApy,
  isFT,
  pool,
}: EstimatedApyChangeEventParams) => {
  pushEvent(account || '', {
    event: 'expectedApy_change',
    eventValue: estimatedApy,
    pool,
    agent: isFT ? 'Fixed Trader' : 'Variable Trader',
  });
};
