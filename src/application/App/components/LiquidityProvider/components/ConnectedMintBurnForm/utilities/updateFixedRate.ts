import { AugmentedAMM } from '@utilities';

export type UpdateFixedRateArgs = {
  amm?: AugmentedAMM;
  fixedRate?: number;
  setFixedRate: (value: number) => void;
};

const updateFixedRate =
  ({ amm, fixedRate, setFixedRate }: UpdateFixedRateArgs) =>
  (newFixedRate: number, increment: boolean) => {
    if (!amm) {
      return;
    }

    const modifier = newFixedRate > (fixedRate || 0) ? 1 : -1;
    let count = 0;
    let closestUsableFixedRate = null;

    while (true) {
      ({ closestUsableFixedRate } = amm.closestTickAndFixedRate(newFixedRate + count * modifier));

      if (!increment) {
        break;
      }

      if (closestUsableFixedRate.toNumber() !== fixedRate) {
        break;
      }

      count += 1;
    }

    setFixedRate(closestUsableFixedRate.toNumber());
  };

export default updateFixedRate;
