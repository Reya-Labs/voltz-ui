import { MellowLpVault } from '@voltz-protocol/v1-sdk';
import { MellowLpVaultArgs } from '@voltz-protocol/v1-sdk/dist/types/entities/mellowLpVault';

export type AugmentedMellowLpVaultArgs = MellowLpVaultArgs & {
  refetch?: () => Promise<void>;
};

class AugmentedMellowLpVault extends MellowLpVault {
  _refetch?: () => Promise<void>;

  constructor({ refetch, ...args }: AugmentedMellowLpVaultArgs) {
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

export default AugmentedMellowLpVault;
