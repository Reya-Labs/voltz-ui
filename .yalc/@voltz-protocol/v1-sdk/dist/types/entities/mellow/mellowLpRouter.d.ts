import { Signer, providers, BigNumberish, BigNumber, ContractReceipt, Contract } from 'ethers';
import { MellowProductMetadata } from './config';
export type MellowLpRouterArgs = {
    id: string;
    mellowRouterAddress: string;
    provider: providers.Provider;
    metadata: MellowProductMetadata & {
        underlyingPools: string[];
    };
};
declare class MellowLpRouter {
    readonly id: string;
    readonly mellowRouterAddress: string;
    readonly provider: providers.Provider;
    metadata: MellowProductMetadata & {
        underlyingPools: string[];
    };
    readOnlyContracts?: {
        token: Contract;
        mellowRouterContract: Contract;
        erc20RootVault: Contract[];
        erc20RootVaultGovernance: Contract[];
    };
    writeContracts?: {
        token: Contract;
        erc20RootVault: Contract[];
        mellowRouter: Contract;
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
    constructor({ mellowRouterAddress, id, provider, metadata }: MellowLpRouterArgs);
    descale: (amount: BigNumberish, decimals: number) => number;
    scale: (amount: number) => BigNumber;
    validateWeights: (weights: number[]) => boolean;
    vaultInit: () => Promise<void>;
    userInit: (signer: Signer) => Promise<void>;
    get tokenName(): string;
    get isETH(): boolean;
    get tokenDecimals(): number;
    get expired(): boolean;
    get depositable(): boolean;
    withdrawable(vaultIndex: number): boolean;
    rolloverable(vaultIndex: number): boolean;
    get userComittedDeposit(): number;
    get userPendingDeposit(): number;
    get userIndividualDeposits(): number[];
    get userDeposit(): number;
    refreshVaultCumulative: () => Promise<void>;
    refreshUserComittedDeposit: () => Promise<void>;
    refreshUserPendingDeposit: () => Promise<void>;
    refreshUserDeposit: () => Promise<void>;
    refreshWalletBalance: () => Promise<void>;
    isTokenApproved: () => Promise<boolean>;
    approveToken: () => Promise<ContractReceipt>;
    deposit: (amount: number, _weights: number[], registration?: boolean | undefined) => Promise<ContractReceipt>;
    withdraw: (vaultIndex: number) => Promise<ContractReceipt>;
    rollover: (vaultIndex: number, _weights: number[]) => Promise<ContractReceipt>;
    registerForAutoRollover: (registration: boolean) => Promise<ContractReceipt>;
    gasRegisterForAutoRollover: (registration: boolean) => Promise<number>;
    getAutorolloverRegistrationFlag: () => Promise<boolean>;
}
export default MellowLpRouter;
//# sourceMappingURL=mellowLpRouter.d.ts.map