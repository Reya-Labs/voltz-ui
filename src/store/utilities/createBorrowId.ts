const createBorrowId = (ammId: string, borrowToFix: number): string => {
  return `Borrow:${ammId}${borrowToFix}`;
};

export default createBorrowId;
