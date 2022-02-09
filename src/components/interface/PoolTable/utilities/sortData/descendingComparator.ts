const descendingComparator = (a: number | string, b: number | string) => {
  if (b < a) {
    return -1;
  }

  if (b > a) {
    return 1;
  }

  return 0;
};

export default descendingComparator;
