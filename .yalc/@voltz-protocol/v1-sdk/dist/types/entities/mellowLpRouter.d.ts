import { Signer, providers, BigNumberish, BigNumber, ContractReceipt, Contract } from 'ethers';
export type MellowLpRouterArgs = {
    mellowRouterAddress: string;
    defaultWeights: number[];
    provider?: providers.Provider;
};
declare class MellowLpRouter {
    readonly mellowRouterAddress: string;
    readonly provider?: providers.Provider;
    readonly defaultWeights: number[];
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
    userDeposit?: number;
    userWalletBalance?: number;
    userAddress?: string;
    vaultInitialized: boolean;
    userInitialized: boolean;
    constructor({ mellowRouterAddress, defaultWeights, provider }: MellowLpRouterArgs);
    descale: (amount: BigNumberish, decimals: number) => number;
    scale: (amount: number) => BigNumber;
    vaultInit: () => Promise<void>;
    userInit: (signer: Signer) => Promise<void>;
    get tokenName(): string;
    get isETH(): boolean;
    get tokenDecimals(): number;
    refreshVaultCumulative: () => Promise<void>;
    refreshUserDeposit: () => Promise<void>;
    refreshWalletBalance: () => Promise<void>;
    isTokenApproved: () => Promise<boolean>;
    approveToken: () => Promise<ContractReceipt>;
    deposit: (amount: number, weights?: number[]) => Promise<ContractReceipt>;
}
export default MellowLpRouter;
//# sourceMappingURL=mellowLpRouter.d.ts.map