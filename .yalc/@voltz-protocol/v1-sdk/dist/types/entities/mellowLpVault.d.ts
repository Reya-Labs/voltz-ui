import { Signer, providers } from 'ethers';
export declare type MellowLpVaultArgs = {
    id: string;
    signer: Signer | null;
    provider?: providers.Provider;
};
declare class MellowLpVault {
    readonly id: string;
    readonly signer: Signer | null;
    readonly provider?: providers.Provider;
    marginEngine?: string;
    constructor({ id, signer, provider }: MellowLpVaultArgs);
    init: () => Promise<void>;
}
export default MellowLpVault;
//# sourceMappingURL=mellowLpVault.d.ts.map