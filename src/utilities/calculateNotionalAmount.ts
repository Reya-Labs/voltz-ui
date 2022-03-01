import isUndefined from 'lodash/isUndefined';

const calculateNotionalAmount = (
  margin: number | undefined,
  leverage: number | undefined,
): number | undefined => {
  if (isUndefined(margin) || isUndefined(leverage)) {
    return undefined;
  }

  return margin * leverage;
};

export default calculateNotionalAmount;
