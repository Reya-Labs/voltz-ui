/* eslint-disable lines-between-class-members */
import { Signer, providers } from 'ethers';

export type MellowLpVaultArgs = {
  id: string;
  signer: Signer | null;
  provider?: providers.Provider;
};

class MellowLpVault {
  public readonly id: string;
  public readonly signer: Signer | null;
  public readonly provider?: providers.Provider;
  public marginEngine?: string;

  public constructor({ id, signer, provider }: MellowLpVaultArgs) {
    this.id = id;
    this.signer = signer;
    this.provider = provider || signer?.provider;
  }

  // TODO: this loads information about the vault
  init = async (): Promise<void> => {
    this.marginEngine = '0x0000000000000000000000000000000000000000';
  };
}

export default MellowLpVault;
