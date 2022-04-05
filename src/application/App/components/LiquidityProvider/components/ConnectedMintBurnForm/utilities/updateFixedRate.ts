import isNull from 'lodash/isNull';

import { AugmentedAMM } from '@utilities';

export type UpdateFixedRateArgs = {
  amm?: AugmentedAMM;
  fixedRate?: number;
  setFixedRate: (value: number) => void;
};

const updateFixedRate =
  ({ amm, setFixedRate }: UpdateFixedRateArgs) =>
  (newFixedRate: number, increment: boolean | null) => {
    if (!amm) {
      return;
    }

    const getCount = () => {
      if (isNull(increment)) {
        return 0;
      }

      return increment ? 1 : -1;
    };

    const nextFixedRate = amm.getNextUsableFixedRate(newFixedRate, getCount());
    setFixedRate(nextFixedRate);
  };

export default updateFixedRate;
