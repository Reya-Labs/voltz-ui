import isUndefined from 'lodash/isUndefined';
import { AMM } from '@voltz-protocol/v1-sdk';

export type UpdateFixedRateArgs = {
  amm?: AMM;
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
