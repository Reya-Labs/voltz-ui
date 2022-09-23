import { Signer, providers, BigNumberish, BigNumber, ContractReceipt } from 'ethers';
import { BaseRateOracle, IERC20Minimal, MarginEngine } from '../typechain';
export declare type MellowLpVaultArgs = {
    id: string;
    provider?: providers.Provider;
};
declare class MellowLpVault {
    readonly id: string;
    readonly provider?: providers.Provider;
    readOnlyContracts?: {
        marginEngine: MarginEngine;
        token: IERC20Minimal;
        rateOracle: BaseRateOracle;
        erc20Vault: any;
    };
    writeContracts?: {
        token: IERC20Minimal;
        erc20Vault: any;
    };
    signer?: Signer;
    maturity?: string;
    protocolId?: number;
    vaultAccumulative?: number;
    vaultCap?: number;
    vaultExpectedApy?: number;
    userDeposit?: number;
    userExpectedCashflow?: number;
    userWalletBalance?: number;
    userAddress?: string;
    vaultInitialized: boolean;
    userInitialized: boolean;
    constructor({ id, provider }: MellowLpVaultArgs);
    descale: (amount: BigNumberish, decimals: number) => number;
    scale: (amount: number) => BigNumber;
    vaultInit: () => Promise<void>;
    userInit: (signer: Signer) => Promise<void>;
    get tokenName(): string;
    get tokenDecimals(): number;
    get protocol(): string;
    refreshVaultCap: () => Promise<void>;
    refreshVaultAccumulative: () => Promise<void>;
    refreshVaultExpectedApy: () => Promise<void>;
    refreshUserDeposit: () => Promise<void>;
    refreshUserExpectedCashflow: () => Promise<void>;
    refreshWalletBalance: () => Promise<void>;
    getTokenApproval: () => Promise<number>;
    approveToken: (amount: number) => Promise<ContractReceipt>;
    deposit: (amount: number) => Promise<ContractReceipt>;
}
export default MellowLpVault;
//# sourceMappingURL=mellowLpVault.d.ts.map