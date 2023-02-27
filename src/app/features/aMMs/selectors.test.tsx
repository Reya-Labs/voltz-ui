import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { DateTime } from 'luxon';

import * as configHook from '../../../hooks/voltz-config/config';
import { selectAMMs, selectBorrowAMMs, selectTraderAMMs } from './selectors';

describe('aMMs.selectors', () => {
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });
  const chainId = SupportedChainId.goerli;
  const state = {
    network: {
      chainId,
    },
    aMMs: {
      aMMs: {
        [chainId]: [
          {
            id: 'pool1',
            rateOracle: { protocolId: 1 },
            endDateTime: DateTime.local().plus({
              millisecond: 1000,
            }),
            market: {
              name: 'Aave',
              tags: {
                isBorrowing: false,
                isAaveV3: false,
              },
            },
          },
          {
            id: 'pool2',
            rateOracle: { protocolId: 5 },
            endDateTime: DateTime.local().plus({
              millisecond: 1000,
            }),
            market: {
              name: 'Aave',
              tags: {
                isBorrowing: true,
                isAaveV3: false,
              },
            },
          },
          {
            id: 'pool3',
            rateOracle: { protocolId: 6 },
            endDateTime: DateTime.local().plus({
              millisecond: -1000,
            }),
            market: {
              name: 'Compound',
              tags: {
                isBorrowing: true,
                isAaveV3: false,
              },
            },
          },
        ],
      },
    },
  };

  describe('selectAMMs', () => {
    it('should return all AMMs', () => {
      const config = { apply: false, pools: [] } as never;
      jest.spyOn(configHook, 'getConfig').mockReturnValue(config);
      expect(selectAMMs(state as never)).toEqual(state.aMMs.aMMs[chainId]);
    });

    it('should return only AMMs with show.general set to true', () => {
      const config = {
        apply: true,
        pools: [
          { id: 'pool1', show: { general: true } },
          { id: 'pool2', show: { general: false } },
          { id: 'pool3', show: { general: false } },
        ],
      };
      jest.spyOn(configHook, 'getConfig').mockReturnValue(config as never);
      expect(selectAMMs(state as never)).toEqual([state.aMMs.aMMs[chainId][0]]);
    });
  });

  describe('selectTraderAMMs', () => {
    it('should return all AMMs', () => {
      const config = { apply: false, pools: [] };
      jest.spyOn(configHook, 'getConfig').mockReturnValue(config as never);
      expect(selectTraderAMMs(state as never)).toEqual(state.aMMs.aMMs[chainId]);
    });

    it('should return only AMMs with show.trader set to true', () => {
      const config = {
        apply: true,
        pools: [
          { id: 'pool1', show: { general: false, trader: true } },
          { id: 'pool2', show: { general: false, trader: true } },
          { id: 'pool3', show: { general: false, trader: false } },
        ],
      };
      jest.spyOn(configHook, 'getConfig').mockReturnValue(config as never);
      expect(selectTraderAMMs(state as never)).toEqual([
        state.aMMs.aMMs[chainId][0],
        state.aMMs.aMMs[chainId][1],
      ]);
    });
  });

  describe('selectBorrowAMMs', () => {
    it('should return BorrowAMMs with endDateTime greater than current time', () => {
      expect(selectBorrowAMMs(state as never)).toHaveLength(1);
      expect(selectBorrowAMMs(state as never)[0].amm.id).toEqual('pool2');
    });
  });
});
