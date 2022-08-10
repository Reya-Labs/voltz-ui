import { BorrowAMM, BorrowAMMConstructorArgs } from '@voltz-protocol/v1-sdk';

export type BorrowingAMMConstructorArgs = BorrowAMMConstructorArgs & {
  refetch?: () => Promise<void>;
};

class AugmentedBorrowAMM extends BorrowAMM {
  _refetch?: () => Promise<void>;

  constructor({ refetch, ...args }: BorrowingAMMConstructorArgs) {
    super(args);

    this._refetch = refetch;
  }

  async refetch() {
    if (!this._refetch) {
      return;
    }

    return this._refetch();
  }
}

export default AugmentedBorrowAMM;