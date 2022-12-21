type PoolConfiguration = {
    name: string;
    id: string;
    show: {
        show: boolean;
        trader: boolean;
    };
    rollover?: string;
};

export type NetworkConfiguration = {
    factoryAddress: string;
    apply: boolean;
    pools: PoolConfiguration[];
};