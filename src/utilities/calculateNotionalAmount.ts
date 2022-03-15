import { BigNumber } from 'ethers';
import isUndefined from 'lodash/isUndefined';

const calculateNotionalAmount = (
  margin: number | undefined,
  leverage: number | undefined,
): BigNumber => {
  if (isUndefined(margin) || isUndefined(leverage)) {
    return BigNumber.from(0);
  }

  return BigNumber.from(margin * leverage);
};

export default calculateNotionalAmount;
