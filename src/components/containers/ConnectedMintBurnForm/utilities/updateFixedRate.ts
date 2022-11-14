import { AugmentedAMM } from '@utilities';
import { isUndefined } from 'lodash';

export type UpdateFixedRateArgs = {
  amm?: AugmentedAMM;
  fixedRate?: number;
  setFixedRate: (value: number | undefined) => void;
};

const updateFixedRate =
  ({ amm, setFixedRate }: UpdateFixedRateArgs) =>
  (newFixedRate: number | undefined) => {
    if (!amm) {
      return;
    }

    const nextFixedRate = isUndefined(newFixedRate)
      ? undefined
      : amm.getNextUsableFixedRate(newFixedRate, 0);
    setFixedRate(nextFixedRate);
  };

export default updateFixedRate;
