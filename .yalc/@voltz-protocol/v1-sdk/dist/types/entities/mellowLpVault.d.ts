import { Signer, providers, BigNumberish, BigNumber, ContractReceipt, Contract } from 'ethers';
import { BaseRateOracle, IERC20Minimal, MarginEngine } from '../typechain';
export declare type MellowLpVaultArgs = {
    voltzVaultAddress: string;
    erc20RootVaultAddress: string;
    erc20RootVaultGovernanceAddress: string;
    provider?: providers.Provider;
};
declare class MellowLpVault {
    readonly voltzVaultAddress: string;
    readonly erc20RootVaultAddress: string;
    readonly erc20RootVaultGovernanceAddress: string;
    readonly provider?: providers.Provider;
    readOnlyContracts?: {
        marginEngine: MarginEngine;
        token: IERC20Minimal;
        rateOracle: BaseRateOracle;
        voltzVault: Contract;
        erc20RootVault: Contract;
        erc20RootVaultGovernance: Contract;
    };
    writeContracts?: {
        token: IERC20Minimal;
        voltzVault: Contract;
        erc20RootVault: Contract;
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
    constructor({ erc20RootVaultAddress, erc20RootVaultGovernanceAddress, voltzVaultAddress, provider, }: MellowLpVaultArgs);
    descale: (amount: BigNumberish, decimals: number) => number;
    scale: (amount: number) => BigNumber;
    vaultInit: () => Promise<void>;
    userInit: (signer: Signer) => Promise<void>;
    get tokenName(): string;
    get tokenDecimals(): number;
    get protocol(): string;
    refreshVaultAccumulative: () => Promise<void>;
    refreshVaultExpectedApy: () => Promise<void>;
    refreshUserDeposit: () => Promise<void>;
    refreshUserExpectedCashflow: () => Promise<void>;
    refreshWalletBalance: () => Promise<void>;
    isTokenApproved: () => Promise<boolean>;
    approveToken: () => Promise<ContractReceipt>;
    deposit: (amount: number) => Promise<ContractReceipt>;
}
export default MellowLpVault;
//# sourceMappingURL=mellowLpVault.d.ts.map