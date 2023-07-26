import { AMM, Position } from '@voltz-protocol/v1-sdk';
import { DateTime } from 'luxon';

import {
  findCurrentAmm,
  generateAmmIdForRoute,
  generatePoolId,
  generatePositionIdForRoute,
  getAmmProtocol,
  getProtocolName,
} from '.';

jest.mock('../../hooks/voltz-config/config', () => ({
  getConfig: function () {
    return {
      pools: [
        { id: '1', rollover: 'customRollover1' },
        { id: '2', rollover: 'customRollover2' },
      ],
    };
  },
}));

describe('utilities/amm', () => {
  describe('findCurrentAmm', () => {
    it('returns the custom rollover AMM when it exists in the config', () => {
      const amms = [
        {
          id: 'customRollover1',
          rateOracle: { id: '1' },
          underlyingToken: { id: '1' },
          endDateTime: DateTime.fromMillis(Date.now() + 100000),
          market: { name: 'Aave', tags: { isBorrowing: false, isAaveV3: false } },
        },
        {
          id: 'customRollover2',
          rateOracle: { id: '2' },
          underlyingToken: { id: '2' },
          endDateTime: DateTime.fromMillis(Date.now() + 200000),
          market: { name: 'Compound', tags: { isBorrowing: false, isAaveV3: false } },
        },
        {
          id: 'other',
          rateOracle: { id: '3' },
          underlyingToken: { id: '3' },
          endDateTime: DateTime.fromMillis(Date.now() + 300000),
          market: { name: 'Lido', tags: { isBorrowing: false, isAaveV3: false } },
        },
      ] as AMM[];
      const selectedPosition = {
        amm: {
          id: '1',
          rateOracle: { id: '1' },
          underlyingToken: { id: '1' },
          market: { name: 'Aave', tags: { isBorrowing: false, isAaveV3: false } },
        },
      } as Position;
      const pools = [
        { id: '1', rollover: 'customRollover1' },
        { id: '2', rollover: 'customRollover2' },
      ] as never;
      const result = findCurrentAmm(amms, pools, selectedPosition);
      expect(result).toEqual(amms[0]);
    });

    it('returns the AMM with the latest end time when multiple matching AMMs exist at least 24 hours until it matures', () => {
      const amms = [
        {
          id: '1',
          rateOracle: { id: '11' },
          underlyingToken: { id: '11' },
          endDateTime: DateTime.fromMillis(Date.now() + 24 * (1000 * 60 * 60) + 100000),
          market: { name: 'test', tags: { isBorrowing: false, isAaveV3: false } },
        },
        {
          id: '2',
          rateOracle: { id: '11' },
          underlyingToken: { id: '11' },
          endDateTime: DateTime.fromMillis(Date.now() + 24 * (1000 * 60 * 60) + 200000),
          market: { name: 'test', tags: { isBorrowing: false, isAaveV3: false } },
        },
        {
          id: '3',
          rateOracle: { id: '11' },
          underlyingToken: { id: '11' },
          endDateTime: DateTime.fromMillis(Date.now() + 24 * (1000 * 60 * 60) + 300000),
          market: { name: 'test', tags: { isBorrowing: false, isAaveV3: false } },
        },
      ] as AMM[];
      const selectedPosition = {
        amm: {
          id: '11',
          rateOracle: { id: '11' },
          underlyingToken: { id: '11' },
          market: { name: 'test', tags: { isBorrowing: false, isAaveV3: false } },
        },
      } as Position;
      const pools = [
        { id: '1', rollover: 'customRollover1' },
        { id: '2', rollover: 'customRollover2' },
      ] as never;
      const result = findCurrentAmm(amms, pools, selectedPosition);
      expect(result).toEqual(amms[2]);
    });

    it('returns undefined when multiple matching AMMs exist but none has at least 24 hours until it matures', () => {
      const amms = [
        {
          id: '1',
          rateOracle: { id: '11' },
          underlyingToken: { id: '11' },
          endDateTime: DateTime.fromMillis(Date.now() + 24 * (1000 * 60 * 60) + 100000),
        },
        {
          id: '2',
          rateOracle: { id: '11' },
          underlyingToken: { id: '11' },
          endDateTime: DateTime.fromMillis(Date.now() + 24 * (1000 * 60 * 60) + 200000),
        },
        {
          id: '3',
          rateOracle: { id: '11' },
          underlyingToken: { id: '11' },
          endDateTime: DateTime.fromMillis(Date.now() + 24 * (1000 * 60 * 60) + 300000),
        },
      ] as AMM[];
      const selectedPosition = {
        amm: {
          id: '11',
          rateOracle: { id: '11' },
          underlyingToken: { id: '11' },
          market: { name: 'test', tags: { isBorrowing: false, isAaveV3: false } },
        },
      } as Position;
      const pools = [
        { id: '1', rollover: 'customRollover1' },
        { id: '2', rollover: 'customRollover2' },
      ] as never;
      const result = findCurrentAmm(amms, pools, selectedPosition);
      expect(result).toEqual(amms[2]);
    });
  });

  describe('getAmmProtocol', () => {
    it('returns the correct protocol for an AMM with a rate oracle protocol ID of "0x00"', () => {
      const amm = {
        protocol: 'uniswap',
        rateOracle: {
          protocolId: 1,
        },
        market: {
          name: 'Aave',
          tags: {
            isBorrowing: false,
            isAaveV3: false,
          },
        },
      } as AMM;
      expect(getAmmProtocol(amm)).toBe('uniswap');
    });

    it('returns the correct protocol for an AMM with a rate oracle protocol ID of "0x01"', () => {
      expect(
        getAmmProtocol({
          protocol: 'balancer',
          rateOracle: {
            protocolId: 5,
          },
          market: {
            name: 'Aave',
            tags: {
              isBorrowing: true,
              isAaveV3: false,
            },
          },
        } as AMM),
      ).toBe('balancer_borrow');
      expect(
        getAmmProtocol({
          protocol: 'balancer',
          rateOracle: {
            protocolId: 6,
          },
          market: {
            name: 'Compound',
            tags: {
              isBorrowing: true,
              isAaveV3: false,
            },
          },
        } as AMM),
      ).toBe('balancer_borrow');
    });
  });

  describe('generatePoolId', () => {
    const mockAMM = {
      id: '0x123',
      underlyingToken: {
        name: 'Token1',
        symbol: 'TK1',
      },
      termEndTimestampInMS: 1656097920000,
      rateOracle: {
        protocolId: 1,
        asset: '0x456',
      },
    } as never;

    it('should generate the correct pool id', () => {
      const expectedPoolId = `aave-token1-2022-06-24`;
      const actualPoolId = generatePoolId(mockAMM);
      expect(actualPoolId).toEqual(expectedPoolId);
    });
  });

  describe('generateAmmIdForRoute', () => {
    const mockAMM: AMM = {
      id: '1_0xe8ddb4676eec36acffdffa6707f422e23a8dfc12_v1',
      underlyingToken: {
        name: 'Token1',
        symbol: 'TK1',
      },
      termEndTimestampInMS: 1656097920000,
      rateOracle: {
        protocolId: 1,
        asset: '0x456',
      },
    } as never;

    it('should generate the correct AMM id for route', () => {
      const expectedAmmIdForRoute = '1_0xe8ddb4676eec36acffdffa6707f422e23a8dfc12_v1';
      const actualAmmIdForRoute = generateAmmIdForRoute(mockAMM);
      expect(actualAmmIdForRoute).toEqual(expectedAmmIdForRoute);
    });
  });

  describe('generatePositionIdForRoute', () => {
    const mockPosition: Position = {
      id: '42161_0x1aac6232b7c7cd6c8479077844eb0302cca0d2af_0x22b908c2fea7a1e6043ffcdbc77d660d4d326961_-36900_-27060',
    } as never;

    it('should generate the correct Position id for route', () => {
      const expectedAmmIdForRoute =
        '42161_0x1aac6232b7c7cd6c8479077844eb0302cca0d2af_0x22b908c2fea7a1e6043ffcdbc77d660d4d326961_-36900_-27060';
      const actualAmmIdForRoute = generatePositionIdForRoute(mockPosition);
      expect(actualAmmIdForRoute).toEqual(expectedAmmIdForRoute);
    });
  });

  describe('getProtocolName', () => {
    it('should return "aave" for protocol id 1', () => {
      expect(getProtocolName(1)).toEqual('aave');
    });

    it('should return "compound" for protocol id 2', () => {
      expect(getProtocolName(2)).toEqual('compound');
    });

    it('should return "lido" for protocol id 3', () => {
      expect(getProtocolName(3)).toEqual('lido');
    });

    it('should return "rocket" for protocol id 4', () => {
      expect(getProtocolName(4)).toEqual('rocket');
    });

    it('should return "aaveBorrowing" for protocol id 5', () => {
      expect(getProtocolName(5)).toEqual('aaveBorrowing');
    });

    it('should return "compoundBorrowing" for protocol id 6', () => {
      expect(getProtocolName(6)).toEqual('compoundBorrowing');
    });

    it('should return "aaveV3" for protocol id 7', () => {
      expect(getProtocolName(7)).toEqual('aaveV3');
    });

    it('should return "gmxGlp" for protocol id 8', () => {
      expect(getProtocolName(8)).toEqual('gmxGlp');
    });

    it('should return "aaveV3Borrowing" for protocol id 9', () => {
      expect(getProtocolName(9)).toEqual('aaveV3Borrowing');
    });

    it('should return "sofr" for protocol id 10', () => {
      expect(getProtocolName(10)).toEqual('sofr');
    });

    it('should throw an error for an unsupported protocol id', () => {
      expect(() => getProtocolName(11)).toThrow('Not supported protocolId');
    });
  });
});
