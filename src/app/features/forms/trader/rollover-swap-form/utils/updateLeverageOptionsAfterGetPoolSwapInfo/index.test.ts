import { formatNumber } from '../../../../../../../utilities/number';
import { calculateLeverageOptions } from '../../../../common/utils';
import { getProspectiveSwapMode } from '../getProspectiveSwapMode';
import { updateLeverageOptionsAfterGetPoolSwapInfo } from './index';

jest.mock('../../../../../../../utilities/number');
jest.mock('../../../../common/utils');
jest.mock('../getProspectiveSwapMode');

describe('updateLeverageOptionsAfterGetPoolSwapInfo', () => {
  const state = {
    poolSwapInfo: {
      maxLeverage: {
        fixed: 5,
        variable: 10,
      },
    },
    prospectiveSwap: {
      leverage: {
        maxLeverage: '',
        options: [],
      },
    },
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should update the maxLeverage and leverage options in state', () => {
    (getProspectiveSwapMode as jest.Mock).mockReturnValue('fixed');
    (formatNumber as jest.Mock).mockReturnValue('5');
    (calculateLeverageOptions as jest.Mock).mockReturnValue(['1x', '2x', '3x']);

    updateLeverageOptionsAfterGetPoolSwapInfo(state as never);

    expect(state.prospectiveSwap.leverage.maxLeverage).toBe('5');
    expect(state.prospectiveSwap.leverage.options).toEqual(['1x', '2x', '3x']);
  });
});
