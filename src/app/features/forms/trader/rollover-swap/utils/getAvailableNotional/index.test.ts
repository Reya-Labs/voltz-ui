import { getProspectiveSwapMode } from '../getProspectiveSwapMode';
import { getAvailableNotional } from '.';

jest.mock('../getProspectiveSwapMode', () => {
  return {
    getProspectiveSwapMode: jest.fn(),
  };
});

describe('getAvailableNotional', () => {
  it('should return available notional', () => {
    (getProspectiveSwapMode as jest.Mock).mockReturnValueOnce('fixed');

    const result = getAvailableNotional({
      poolSwapInfo: {
        availableNotional: {
          fixed: 100,
        },
      },
    } as never);

    expect(result).toEqual(100);
  });
});
