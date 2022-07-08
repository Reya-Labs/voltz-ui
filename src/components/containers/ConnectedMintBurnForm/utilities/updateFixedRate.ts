import { AugmentedAMM } from '@utilities';
import { isNull, isUndefined } from 'lodash';

export type UpdateFixedRateArgs = {
  amm?: AugmentedAMM;
  fixedRate?: number;
  setFixedRate: (value: number | undefined) => void;
};

const updateFixedRate =
  ({ amm, setFixedRate }: UpdateFixedRateArgs) =>
  (newFixedRate: number | undefined, increment: boolean | null) => {
    if (!amm) {
      return;
    }

    const getCount = () => {
      if (isNull(increment)) {
        return 0;
      }

      return increment ? 1 : -1;
    };

    const nextFixedRate = isUndefined(newFixedRate) ? undefined : amm.getNextUsableFixedRate(newFixedRate, getCount());
    setFixedRate(nextFixedRate);
  };

export default updateFixedRate;
