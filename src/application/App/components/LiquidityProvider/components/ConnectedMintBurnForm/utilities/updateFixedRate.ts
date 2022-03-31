import { AugmentedAMM } from '@utilities';

export type UpdateFixedRateArgs = {
  amm?: AugmentedAMM;
  fixedRate?: number;
  setFixedRate: (value: number) => void;
};

const updateFixedRate =
  ({ amm, fixedRate, setFixedRate }: UpdateFixedRateArgs) =>
    (newFixedRate: number) => {
      if (!amm) {
        return;
      }

      let count = 0;
      count += newFixedRate > (fixedRate || 0) ? 1 : -1;

      const nextFixedRate = amm.getNextUsableFixedRate(newFixedRate, 0);
      setFixedRate(nextFixedRate);
    };

export default updateFixedRate;
