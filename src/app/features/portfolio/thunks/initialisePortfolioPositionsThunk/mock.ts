import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { PositionMock } from './index';

const randomValue = () => (Math.random() * 100 > 50 ? -1 : 1) * Math.random() * (1e7 - 1e3) + 1e3;
const randomValue2 = () => Math.random() * (1e4 - 100) + 100;
const randomDate = () => 1654022400000 - (Math.random() * (10 - 1) + 1) * 60 * 60 * 24 * 1000;
export const positionMocks: PositionMock[] = [
  {
    type: 'LP',
    id: '1',
    chainId: SupportedChainId.mainnet,
    market: 'Aave',
    token: 'eth',
    name: 'Position 1',
    notional: randomValue2(),
    margin: randomValue2(),
    termEndTimestampInMS: randomDate(),
    status: {
      variant: 'none',
      value: 0,
    },
    unrealizedPNL: randomValue(),
    realizedPNL: randomValue(),
    isBorrowing: false,
    isAaveV3: true,
    isV2: false,
  },
  {
    type: 'Variable',
    id: '2',
    chainId: SupportedChainId.mainnet,
    market: 'Compound',
    token: 'usdc',
    name: 'Position 2',
    notional: randomValue2(),
    margin: randomValue2(),
    termEndTimestampInMS: randomDate(),
    status: {
      variant: 'in-range',
      value: 50,
    },
    unrealizedPNL: randomValue(),
    realizedPNL: randomValue(),
    isBorrowing: true,
    isAaveV3: false,
    isV2: true,
  },
  {
    type: 'Fixed',
    id: '3',
    chainId: SupportedChainId.avalanche,
    market: 'Lido',
    token: 'eth',
    name: 'Position 3',
    notional: randomValue2(),
    margin: randomValue2(),
    termEndTimestampInMS: randomDate(),
    status: {
      variant: 'paying',
      value: 75,
    },
    unrealizedPNL: randomValue(),
    realizedPNL: randomValue(),
    isBorrowing: false,
    isAaveV3: true,
    isV2: true,
  },
  {
    type: 'Variable',
    id: '4',
    chainId: SupportedChainId.avalanche,
    market: 'Rocket',
    token: 'dai',
    name: 'Position 4',
    notional: randomValue2(),
    margin: randomValue2(),
    termEndTimestampInMS: randomDate(),
    status: {
      variant: 'receiving',
      value: 25,
    },
    unrealizedPNL: randomValue(),
    realizedPNL: randomValue(),
    isBorrowing: true,
    isAaveV3: false,
    isV2: false,
  },
  {
    type: 'Fixed',
    id: '5',
    chainId: SupportedChainId.arbitrum,
    market: 'GMX:GLP',
    token: 'eth',
    name: 'Position 5',
    notional: randomValue2(),
    margin: randomValue2(),
    termEndTimestampInMS: randomDate(),
    status: {
      variant: 'in-range',
      value: 60,
    },
    unrealizedPNL: randomValue(),
    realizedPNL: randomValue(),
    isBorrowing: true,
    isAaveV3: true,
    isV2: false,
  },
  {
    type: 'LP',
    id: '6',
    chainId: SupportedChainId.arbitrum,
    market: 'SOFR',
    token: 'usdt',
    name: 'Position 6',
    notional: randomValue2(),
    margin: randomValue2(),
    termEndTimestampInMS: randomDate(),
    status: {
      variant: 'none',
      value: 0,
    },
    unrealizedPNL: randomValue(),
    realizedPNL: randomValue(),
    isBorrowing: false,
    isAaveV3: true,
    isV2: false,
  },
  {
    type: 'LP',
    id: '7',
    chainId: SupportedChainId.mainnet,
    market: 'Aave',
    token: 'usdc',
    name: 'Position 7',
    notional: randomValue2(),
    margin: randomValue2(),
    termEndTimestampInMS: randomDate(),
    status: {
      variant: 'in-range',
      value: 80,
    },
    unrealizedPNL: randomValue(),
    realizedPNL: randomValue(),
    isBorrowing: true,
    isAaveV3: true,
    isV2: false,
  },
  {
    type: 'Fixed',
    id: '8',
    chainId: SupportedChainId.avalanche,
    market: 'Compound',
    token: 'usdt',
    name: 'Position 8',
    notional: randomValue2(),
    margin: randomValue2(),
    termEndTimestampInMS: randomDate(),
    status: {
      variant: 'paying',
      value: 70,
    },
    unrealizedPNL: randomValue(),
    realizedPNL: randomValue(),
    isBorrowing: false,
    isAaveV3: false,
    isV2: true,
  },
  {
    type: 'Variable',
    id: '9',
    chainId: SupportedChainId.arbitrum,
    market: 'Lido',
    token: 'usdt',
    name: 'Position 9',
    notional: randomValue2(),
    margin: randomValue2(),
    termEndTimestampInMS: randomDate(),
    status: {
      variant: 'receiving',
      value: 30,
    },
    unrealizedPNL: randomValue(),
    realizedPNL: randomValue(),
    isBorrowing: true,
    isAaveV3: true,
    isV2: true,
  },
  {
    type: 'Fixed',
    id: '10',
    chainId: SupportedChainId.mainnet,
    market: 'Rocket',
    token: 'eth',
    name: 'Position 10',
    notional: randomValue2(),
    margin: randomValue2(),
    termEndTimestampInMS: randomDate(),
    status: {
      variant: 'none',
      value: 0,
    },
    unrealizedPNL: randomValue(),
    realizedPNL: randomValue(),
    isBorrowing: false,
    isAaveV3: false,
    isV2: false,
  },
  {
    type: 'LP',
    id: '11',
    chainId: SupportedChainId.avalanche,
    market: 'GMX:GLP',
    token: 'usdc',
    name: 'Position 11',
    notional: randomValue2(),
    margin: randomValue2(),
    termEndTimestampInMS: randomDate(),
    status: {
      variant: 'in-range',
      value: 90,
    },
    unrealizedPNL: randomValue(),
    realizedPNL: randomValue(),
    isBorrowing: true,
    isAaveV3: true,
    isV2: false,
  },
];