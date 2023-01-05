import { sentryTracker } from '../utils/sentry';

export const getProtocolPrefix = (protocolId: number): string => {
  switch (protocolId) {
    case 1: {
      return 'a';
    }
    case 2: {
      return 'c';
    }
    case 3: {
      return 'st';
    }
    case 4: {
      return 'r';
    }
    case 5: {
      return 'a';
    }
    case 6: {
      return 'c';
    }
    default: {
      return '-';
    }
  }
};

export const getTokenInfo = (tokenAddress: string): { name: string; decimals: number } => {
  // mainnet
  if (
    tokenAddress.toLowerCase().includes('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'.toLowerCase())
  ) {
    return { name: 'USDC', decimals: 6 };
  }

  // goerli
  if (
    tokenAddress.toLowerCase().includes('0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C'.toLowerCase())
  ) {
    return { name: 'USDC', decimals: 6 };
  }

  // goerli
  if (
    tokenAddress.toLowerCase().includes('0x2f3a40a3db8a7e3d09b0adfefbce4f6f81927557'.toLowerCase())
  ) {
    return { name: 'USDC', decimals: 6 };
  }

  // mainnet
  if (
    tokenAddress.toLowerCase().includes('0x6b175474e89094c44da98b954eedeac495271d0f'.toLowerCase())
  ) {
    return { name: 'DAI', decimals: 18 };
  }

  // goerli
  if (
    tokenAddress.toLowerCase().includes('0x73967c6a0904aa032c103b4104747e88c566b1a2'.toLowerCase())
  ) {
    return { name: 'DAI', decimals: 18 };
  }

  // mainnet
  if (
    tokenAddress.toLowerCase().includes('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'.toLowerCase())
  ) {
    return { name: 'ETH', decimals: 18 };
  }

  // goerli
  if (
    tokenAddress.toLowerCase().includes('0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'.toLowerCase())
  ) {
    return { name: 'ETH', decimals: 18 };
  }

  // mainnet
  if (
    tokenAddress.toLowerCase().includes('0xdAC17F958D2ee523a2206206994597C13D831ec7'.toLowerCase())
  ) {
    return { name: 'USDT', decimals: 6 };
  }

  // goerli
  if (
    tokenAddress.toLowerCase().includes('0x79C950C7446B234a6Ad53B908fBF342b01c4d446'.toLowerCase())
  ) {
    return { name: 'USDT', decimals: 6 };
  }

  // goerli
  if (
    tokenAddress.toLowerCase().includes('0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49'.toLowerCase())
  ) {
    return { name: 'USDT', decimals: 6 };
  }

  sentryTracker.captureMessage(`Token address ${tokenAddress} not supported.`);
  throw new Error(`Token address ${tokenAddress} not supported.`);
};
