import isUndefined from 'lodash/isUndefined';

const descendingComparator = (a: number | string | undefined, b: number | string | undefined) => {
  if (isUndefined(a) || isUndefined(b)) {
    return 0;
  }

  if (b < a) {
    return -1;
  }

  if (b > a) {
    return 1;
  }

  return 0;
};

export default descendingComparator;
