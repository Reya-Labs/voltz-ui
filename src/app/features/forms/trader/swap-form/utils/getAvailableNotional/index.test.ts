import { getProspectiveSwapMode } from '../getProspectiveSwapMode';
import { hasExistingPosition } from '../hasExistingPosition';
import { getAvailableNotional } from './index';

jest.mock('../hasExistingPosition', () => {
  return {
    hasExistingPosition: jest.fn(),
  };
});

jest.mock('../getProspectiveSwapMode', () => {
  return {
    getProspectiveSwapMode: jest.fn(),
  };
});

describe('getAvailableNotional', () => {
  it('should return available notional if no existing position', () => {
    (hasExistingPosition as jest.Mock).mockReturnValueOnce(false);
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

  it('should return available notional if edit mode is not remove', () => {
    (hasExistingPosition as jest.Mock).mockReturnValueOnce(false);
    (getProspectiveSwapMode as jest.Mock).mockReturnValueOnce('fixed');

    const result = getAvailableNotional({
      userInput: {
        notionalAmount: {
          editMode: 'not-remove',
        },
      },
      poolSwapInfo: {
        availableNotional: {
          fixed: 100,
        },
      },
    } as never);

    expect(result).toEqual(100);
  });

  it('should return min of available notional and position notional if existing position and edit mode is remove (pos.notional < availableNotional)', () => {
    (hasExistingPosition as jest.Mock).mockReturnValueOnce(true);
    (getProspectiveSwapMode as jest.Mock).mockReturnValueOnce('fixed');

    const result = getAvailableNotional({
      position: {
        value: {
          notional: 30,
        },
      },
      userInput: {
        notionalAmount: {
          editMode: 'remove',
        },
      },
      poolSwapInfo: {
        availableNotional: {
          fixed: 100,
        },
      },
    } as never);

    expect(result).toEqual(30);
  });

  it('should return min of available notional and position notional if existing position and edit mode is remove (pos.notional > availableNotional)', () => {
    (hasExistingPosition as jest.Mock).mockReturnValueOnce(true);
    (getProspectiveSwapMode as jest.Mock).mockReturnValueOnce('variable');

    const result = getAvailableNotional({
      position: {
        value: {
          notional: 100,
        },
      },
      userInput: {
        notionalAmount: {
          editMode: 'remove',
        },
      },
      poolSwapInfo: {
        availableNotional: {
          variable: 20,
        },
      },
    } as never);

    expect(result).toEqual(20);
  });
});
