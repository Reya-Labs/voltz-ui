import { AMM } from '@voltz/v1-sdk';
import isNull from 'lodash/isNull';

export type UpdateFixedRateArgs = {
  amm?: AMM;
  fixedRate?: number;
  setFixedRate: (value: number) => void;
};

const updateFixedRate =
  ({ amm, fixedRate, setFixedRate }: UpdateFixedRateArgs) =>
  (newFixedRate: number) => {
    if (!amm) {
      return;
    }

    const modifier = newFixedRate > (fixedRate || 0) ? 1 : -1;
    let count = 0;
    let closestUsableFixedRate = null;

    while (isNull(closestUsableFixedRate) || closestUsableFixedRate.toNumber() === fixedRate) {
      ({ closestUsableFixedRate } = amm.closestTickAndFixedRate(newFixedRate + count * modifier));

      count += 1;
    }

    setFixedRate(closestUsableFixedRate.toNumber());
  };

export default updateFixedRate;
