import { AMM } from '@voltz-protocol/v1-sdk';
import isUndefined from 'lodash.isundefined';

export type UpdateFixedRateArgs = {
  amm?: AMM;
  fixedRate?: number;
  setFixedRate: (value: number | undefined) => void;
};

export const updateFixedRate =
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
