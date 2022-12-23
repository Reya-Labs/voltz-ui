type PoolConfiguration = {
  name: string;
  id: string;
  show: {
    general: boolean;
    trader: boolean;
  };
  traderWithdrawable: boolean;
  rollover?: string;
};

export type NetworkConfiguration = {
  factoryAddress: string;
  wethAddress: string;
  apply: boolean;
  pools: PoolConfiguration[];
};
