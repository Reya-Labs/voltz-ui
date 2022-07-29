import { ONE_YEAR_IN_SECONDS } from '../constants';

const getAnnualizedTime = (start: number, end: number): number => {
  return (end - start) / ONE_YEAR_IN_SECONDS;
};

export const getExpectedApy = (
  current: number, // current timestamp in seconds
  end: number, // end timestamp in seconds
  uft: number, // unbalanced fixed token balance
  vt: number, // variable token balance
  margin: number, // margin until the current timestamp (margin + accrued cashflow)
  predictedApr: number, // the predicted variable APY between current and end
): number => {
  // (rate[end]/rate[current])^(YEAR / (end-current)) - 1 = APY(current, end)
  // rate[end]/rate[current] = (APY(current, end) + 1)^((end - current)/YEAR)
  // rate[end]/rate[current] - 1 = (APY(current, end) + 1)^((end - current)/YEAR) - 1
  const vf = (1 + predictedApr) ** getAnnualizedTime(current, end) - 1;

  // cashflow = uft * (end - current) / YEAR * 0.01 + vt * (rate[end]/rate[current] - 1)
  const ecs = uft * getAnnualizedTime(current, end) * 0.01 + vt * vf;

  // PNL = (1 + estimated cashflow / margin so far) ^ (YEAR / (end - current)) - 1
  const pnl = (1 + ecs / margin) ** (1 / getAnnualizedTime(current, end)) - 1;

  return pnl;
};
