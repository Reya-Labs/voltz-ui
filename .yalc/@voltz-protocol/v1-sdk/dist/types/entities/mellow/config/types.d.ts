import MellowLpRouter from '../mellowLpRouter';
import MellowLpVault from '../mellowLpVault';
export type MellowProductMetadata = {
    show: boolean;
    soon: boolean;
    deprecated: boolean;
    title: string;
    token: string;
    description: string;
    vaults: {
        weight: number;
        maturityTimestampMS: number;
        pools: string[];
        estimatedHistoricApy: [number, number];
        withdrawable: boolean;
    }[];
};
export type MellowProduct = MellowLpVault | MellowLpRouter;
export type NetworkConfiguration = {
    MELLOW_ETH_WRAPPER: string;
    MELLOW_VAULTS: {
        voltzVault: string;
        erc20RootVault: string;
        erc20RootVaultGovernance: string;
        metadata: MellowProductMetadata;
    }[];
    MELLOW_ROUTERS: {
        router: string;
        metadata: MellowProductMetadata;
    }[];
};
//# sourceMappingURL=types.d.ts.map