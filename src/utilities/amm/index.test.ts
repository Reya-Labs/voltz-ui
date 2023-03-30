import { AMM, Position } from '@voltz-protocol/v1-sdk';
import { DateTime } from 'luxon';

import {
  findCurrentAmm,
  findCurrentPosition,
  findCurrentPositionLp,
  findCurrentPositionsLp,
  getAmmProtocol,
} from './index';

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
  describe('findCurrentPositionsLp', () => {
    it('returns the correct positions when they exist in the list', () => {
      const positions = [
        {
          amm: { id: '1', market: { name: 'Aave', tags: { isBorrowing: false, isAaveV3: false } } },
        },
        {
          amm: {
            id: '2',
            market: { name: 'Compound', tags: { isBorrowing: false, isAaveV3: false } },
          },
        },
        {
          amm: { id: '3', market: { name: 'Lido', tags: { isBorrowing: false, isAaveV3: false } } },
        },
      ] as Position[];
      const selectedAmmId = '2';
      const result = findCurrentPositionsLp(positions, selectedAmmId);
      expect(result).toEqual([
        {
          amm: {
            id: '2',
            market: { name: 'Compound', tags: { isBorrowing: false, isAaveV3: false } },
          },
        },
      ]);
    });

    it('returns empty list when no positions exist in the list', () => {
      const positions = [
        {
          amm: { id: '1', market: { name: 'Aave', tags: { isBorrowing: false, isAaveV3: false } } },
        },
        {
          amm: {
            id: '2',
            market: { name: 'Compound', tags: { isBorrowing: false, isAaveV3: false } },
          },
        },
        {
          amm: { id: '3', market: { name: 'Lido', tags: { isBorrowing: false, isAaveV3: false } } },
        },
      ] as Position[];
      const selectedAmmId = '4';
      const result = findCurrentPositionsLp(positions, selectedAmmId);
      expect(result).toEqual([]);
    });

    it('returns underfined when the positions list is empty', () => {
      const selectedAmmId = '2';
      const result = findCurrentPosition([], selectedAmmId);
      expect(result).toBeUndefined();
    });
  });

  describe('findCurrentPositionLp', () => {
    it('returns the correct position when it exists in the list', () => {
      const positions = [
        {
          amm: { id: '1', market: { name: 'Aave', tags: { isBorrowing: false, isAaveV3: false } } },
          fixedRateLower: {
            toNumber: () => {
              return 1;
            },
          },
          fixedRateUpper: {
            toNumber: () => {
              return 3;
            },
          },
        },
        {
          amm: { id: '1', market: { name: 'Aave', tags: { isBorrowing: false, isAaveV3: false } } },
          fixedRateLower: {
            toNumber: () => {
              return 1;
            },
          },
          fixedRateUpper: {
            toNumber: () => {
              return 2;
            },
          },
        },
      ] as never;
      const fixedLower: number = 1;
      const fixedUpper: number = 3;
      const result = findCurrentPositionLp(positions, fixedLower, fixedUpper);
      expect(result?.amm.id).toEqual('1');
      expect(result?.fixedRateLower.toNumber()).toEqual(1);
      expect(result?.fixedRateUpper.toNumber()).toEqual(3);
    });

    it('returns undefined when the position does not exist in the list', () => {
      const positions = [
        {
          amm: { id: '1', market: { name: 'Aave', tags: { isBorrowing: false, isAaveV3: false } } },
          fixedRateLower: {
            toNumber: () => {
              return 1;
            },
          },
          fixedRateUpper: {
            toNumber: () => {
              return 3;
            },
          },
        },
        {
          amm: { id: '1', market: { name: 'Aave', tags: { isBorrowing: false, isAaveV3: false } } },
          fixedRateLower: {
            toNumber: () => {
              return 1;
            },
          },
          fixedRateUpper: {
            toNumber: () => {
              return 2;
            },
          },
        },
      ] as never;
      const fixedLower: number = 1;
      const fixedUpper: number = 10;
      const result = findCurrentPositionLp(positions, fixedLower, fixedUpper);
      expect(result).toBeUndefined();
    });

    it('returns undefined when the positions list is empty', () => {
      const positions = [] as never;
      const fixedLower: number = 1;
      const fixedUpper: number = 10;
      const result = findCurrentPositionLp(positions, fixedLower, fixedUpper);
      expect(result).toBeUndefined();
    });
  });

  describe('findCurrentPosition', () => {
    it('returns the correct position when it exists in the list', () => {
      const positions = [
        {
          amm: { id: '1', market: { name: 'Aave', tags: { isBorrowing: false, isAaveV3: false } } },
        },
        {
          amm: {
            id: '2',
            market: { name: 'Compound', tags: { isBorrowing: false, isAaveV3: false } },
          },
        },
        {
          amm: { id: '3', market: { name: 'Lido', tags: { isBorrowing: false, isAaveV3: false } } },
        },
      ] as Position[];
      const selectedAmmId = '2';
      const result = findCurrentPosition(positions, selectedAmmId);
      expect(result).toEqual({
        amm: {
          id: '2',
          market: { name: 'Compound', tags: { isBorrowing: false, isAaveV3: false } },
        },
      });
    });

    it('returns undefined when the position does not exist in the list', () => {
      const positions = [
        {
          amm: { id: '1', market: { name: 'Aave', tags: { isBorrowing: false, isAaveV3: false } } },
        },
        {
          amm: {
            id: '2',
            market: { name: 'Compound', tags: { isBorrowing: false, isAaveV3: false } },
          },
        },
        {
          amm: { id: '3', market: { name: 'Lido', tags: { isBorrowing: false, isAaveV3: false } } },
        },
      ] as Position[];
      const selectedAmmId = '4';
      const result = findCurrentPosition(positions, selectedAmmId);
      expect(result).toBeUndefined();
    });

    it('returns undefined when the positions list is empty', () => {
      const selectedAmmId = '2';
      const result = findCurrentPosition([], selectedAmmId);
      expect(result).toBeUndefined();
    });
  });

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
});
