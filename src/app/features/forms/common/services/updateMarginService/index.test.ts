import { updateMargin as updateMarginV1Mock } from '@voltz-protocol/sdk-v1-stateless';
import { updateMargin as updateMarginV2Mock } from '@voltz-protocol/sdk-v2';

import { isV2AMM } from '../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { updateMarginService } from '.';

jest.mock('@voltz-protocol/sdk-v1-stateless');
jest.mock('@voltz-protocol/sdk-v2');
jest.mock('@voltz-protocol/v1-sdk');
jest.mock('../../../../../../utilities/amm');
jest.mock('../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled');

describe('updateMarginService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call updateMarginV2 if isV2AMM returns true', async () => {
    const amm = { id: 'your-amm-id' };
    const signer = {};
    const positionId = 'your-position-id';
    const margin = 10;
    const updateMarginV2MockFn = updateMarginV2Mock as jest.MockedFunction<
      typeof updateMarginV2Mock
    >;
    (isV2AMM as jest.Mock).mockReturnValue(true);
    updateMarginV2MockFn.mockResolvedValue({} as never);

    const receipt = await updateMarginService({
      amm,
      signer,
      positionId,
      margin,
      fixedLow: 0,
      fixedHigh: 0,
    } as never);

    expect(receipt).toEqual({});
    expect(updateMarginV2MockFn).toHaveBeenCalledWith({ positionId, signer, margin });
  });

  it('should call updateMargin if isV2AMM returns false and isV1StatelessEnabled returns true', async () => {
    const amm = { id: 'your-amm-id' };
    const signer = {};
    const positionId = 'your-position-id';
    const margin = 10;
    const updateMarginV1MockFn = updateMarginV1Mock as jest.MockedFunction<
      typeof updateMarginV1Mock
    >;
    (isV2AMM as jest.Mock).mockReturnValue(false);
    (isV1StatelessEnabled as jest.Mock).mockReturnValue(true);
    updateMarginV1MockFn.mockResolvedValue({} as never);

    const receipt = await updateMarginService({
      amm,
      signer,
      positionId,
      margin,
      fixedLow: 0,
      fixedHigh: 0,
    } as never);

    expect(receipt).toEqual({});
    expect(updateMarginV1MockFn).toHaveBeenCalledWith({ positionId, signer, margin });
  });

  it('should call amm.updatePositionMargin if isV2AMM returns false and isV1StatelessEnabled returns false', async () => {
    const amm = {
      id: 'your-amm-id',
      updatePositionMargin: jest.fn().mockResolvedValue({} as never),
    };
    const signer = {};
    const positionId = 'your-position-id';
    const margin = 10;
    const fixedLow = 5;
    const fixedHigh = 15;
    (isV2AMM as jest.Mock).mockReturnValue(false);
    (isV1StatelessEnabled as jest.Mock).mockReturnValue(false);

    const receipt = await updateMarginService({
      amm,
      signer,
      positionId,
      margin,
      fixedLow,
      fixedHigh,
    } as never);

    expect(receipt).toEqual({});
    expect(amm.updatePositionMargin).toHaveBeenCalledWith({
      fixedLow,
      fixedHigh,
      marginDelta: margin,
    });
  });
});
