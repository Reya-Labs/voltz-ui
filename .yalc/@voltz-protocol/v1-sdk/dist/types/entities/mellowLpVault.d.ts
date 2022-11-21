import { Signer, providers, BigNumberish, BigNumber, ContractReceipt, Contract } from 'ethers';
export declare type MellowLpVaultArgs = {
    ethWrapperAddress: string;
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
    readonly ethWrapperAddress: string;
    readOnlyContracts?: {
        marginEngine: Contract;
        token: Contract;
        rateOracle: Contract;
        voltzVault: Contract;
        erc20RootVault: Contract;
        erc20RootVaultGovernance: Contract;
    };
    writeContracts?: {
        token: Contract;
        erc20RootVault: Contract;
        ethWrapper: Contract;
    };
    signer?: Signer;
    maturity?: string;
    protocolId?: number;
    vaultCumulative?: number;
    vaultCap?: number;
    vaultExpectedApy?: number;
    userDeposit?: number;
    userWalletBalance?: number;
    userAddress?: string;
    vaultInitialized: boolean;
    userInitialized: boolean;
    constructor({ ethWrapperAddress, erc20RootVaultAddress, erc20RootVaultGovernanceAddress, voltzVaultAddress, provider, }: MellowLpVaultArgs);
    descale: (amount: BigNumberish, decimals: number) => number;
    scale: (amount: number) => BigNumber;
    vaultInit: () => Promise<void>;
    userInit: (signer: Signer) => Promise<void>;
    get tokenName(): string;
    get isETH(): boolean;
    get tokenDecimals(): number;
    get protocol(): string;
    refreshVaultCumulative: () => Promise<void>;
    refreshVaultExpectedApy: () => Promise<void>;
    refreshUserDeposit: () => Promise<void>;
    refreshWalletBalance: () => Promise<void>;
    isTokenApproved: () => Promise<boolean>;
    approveToken: () => Promise<ContractReceipt>;
    deposit: (amount: number) => Promise<ContractReceipt>;
}
export default MellowLpVault;
//# sourceMappingURL=mellowLpVault.d.ts.map