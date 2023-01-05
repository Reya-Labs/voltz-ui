import { Signer, providers, BigNumberish, BigNumber, ContractReceipt, Contract } from 'ethers';
import { MellowProductMetadata } from './config/types';
export type MellowLpVaultArgs = {
    id: string;
    ethWrapperAddress: string;
    erc20RootVaultAddress: string;
    provider: providers.Provider;
    metadata: MellowProductMetadata & {
        underlyingPools: string[];
    };
};
declare class MellowLpVault {
    readonly id: string;
    readonly provider: providers.Provider;
    metadata: MellowProductMetadata & {
        underlyingPools: string[];
    };
    readonly ethWrapperAddress: string;
    readonly erc20RootVaultAddress: string;
    readOnlyContracts?: {
        token: Contract;
        erc20RootVault: Contract[];
        erc20RootVaultGovernance: Contract[];
    };
    writeContracts?: {
        token: Contract;
        erc20RootVault: Contract[];
        ethWrapper: Contract;
    };
    signer?: Signer;
    vaultCumulative?: number;
    vaultCap?: number;
    userIndividualCommittedDeposits: number[];
    userIndividualPendingDeposit: number[];
    userWalletBalance?: number;
    userAddress?: string;
    vaultInitialized: boolean;
    userInitialized: boolean;
    vaultsCount: number;
    constructor({ id, ethWrapperAddress, erc20RootVaultAddress, provider, metadata, }: MellowLpVaultArgs);
    descale: (amount: BigNumberish, decimals: number) => number;
    scale: (amount: number) => BigNumber;
    vaultInit: () => Promise<void>;
    userInit: (signer: Signer) => Promise<void>;
    get tokenName(): string;
    get isETH(): boolean;
    get tokenDecimals(): number;
    get expired(): boolean;
    get depositable(): boolean;
    withdrawable(): boolean;
    rolloverable(): boolean;
    get userComittedDeposit(): number;
    get userPendingDeposit(): number;
    get userIndividualDeposits(): number[];
    get userDeposit(): number;
    refreshVaultCumulative: () => Promise<void>;
    refreshUserDeposit: () => Promise<void>;
    refreshWalletBalance: () => Promise<void>;
    isTokenApproved: () => Promise<boolean>;
    approveToken: () => Promise<ContractReceipt>;
    deposit: (amount: number) => Promise<ContractReceipt>;
    withdraw: () => Promise<ContractReceipt>;
    rollover: () => Promise<ContractReceipt>;
    registerForAutoRollover: () => Promise<ContractReceipt>;
    gasRegisterForAutoRollover: () => Promise<number>;
    getAutorolloverRegistrationFlag: () => Promise<boolean>;
}
export default MellowLpVault;
//# sourceMappingURL=mellowLpVault.d.ts.map