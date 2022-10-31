export const getRenderMode = (isForm: boolean | undefined) => {
  return isForm ? 'fix-borrow' : 'borrow-positions';
};
