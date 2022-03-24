import { AMM, AMMConstructorArgs } from '@voltz/v1-sdk';

export type AugmentedAMMConstructorArgs = AMMConstructorArgs & {
  refetch?: () => Promise<void>;
};

class AugmentedAMM extends AMM {
  _refetch?: () => Promise<void>;

  constructor({ refetch, ...args }: AugmentedAMMConstructorArgs) {
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

export default AugmentedAMM;
