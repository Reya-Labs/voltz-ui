import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { DateTime } from 'luxon';

import { selectAMMs, selectTraderAMMs } from './selectors';

describe('aMMs.selectors', () => {
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });
  const state = {
    network: {
      chainId: SupportedChainId.goerli,
    },
    aMMs: {
      aMMs: [
        {
          traderVisible: true,
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
          traderVisible: true,
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
          traderVisible: false,
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
  };

  describe('selectAMMs', () => {
    it('should return all AMMs', () => {
      expect(selectAMMs(state as never)).toEqual(state.aMMs.aMMs);
    });
  });

  describe('selectTraderAMMs', () => {
    it('should return only AMMs with traderVisible set to true', () => {
      expect(selectTraderAMMs(state as never)).toEqual([state.aMMs.aMMs[0], state.aMMs.aMMs[1]]);
    });
  });
});
