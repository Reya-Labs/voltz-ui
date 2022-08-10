const createBorrowId = (ammId: string, notional: number): string => {
  return `Borrow:${ammId}${notional}`;
};

export default createBorrowId;
