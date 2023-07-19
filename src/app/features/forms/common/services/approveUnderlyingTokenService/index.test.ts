import { approvePeriphery } from '@voltz-protocol/sdk-v1-stateless';
import { approvePeriphery as approvePeripheryV2 } from '@voltz-protocol/sdk-v2';
import { Signer } from 'ethers';

import { isV2AMM } from '../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { approveUnderlyingTokenService } from './index';

// Mock dependencies
jest.mock('@voltz-protocol/sdk-v1-stateless', () => ({
  approvePeriphery: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@voltz-protocol/sdk-v2', () => ({
  approvePeriphery: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../../../../../../utilities/amm', () => ({
  isV2AMM: jest.fn().mockReturnValue(false),
}));

jest.mock('../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled', () => ({
  isV1StatelessEnabled: jest.fn().mockReturnValue(false),
}));

describe('approveUnderlyingToken', () => {
  beforeEach(() => {
    // Clear mock function calls and mock implementation
    jest.clearAllMocks();
  });

  it('should return 0 if amm or signer is not provided', async () => {
    const result = await approveUnderlyingTokenService({ amm: null!, signer: null! });
    expect(result).toBe(0);
  });

  it('should call approvePeripheryV2 if isV2AMM returns true', async () => {
    (isV2AMM as jest.Mock).mockReturnValue(true);
    const amm = { id: 'ammId', approveUnderlyingTokenForPeripheryV1: jest.fn() };
    const signer: Signer = {} as Signer;
    (approvePeripheryV2 as jest.Mock).mockResolvedValue(123);
    const result = await approveUnderlyingTokenService({ amm, signer } as never);

    expect(approvePeripheryV2).toHaveBeenCalledWith({ signer, ammId: amm.id });
    expect(approvePeriphery).not.toHaveBeenCalled();
    expect(result).toEqual(123);
    expect(amm.approveUnderlyingTokenForPeripheryV1).not.toHaveBeenCalled();
  });

  it('should call approvePeriphery if isV2AMM returns false and isV1StatelessEnabled returns true', async () => {
    (isV2AMM as jest.Mock).mockReturnValue(false);
    (isV1StatelessEnabled as jest.Mock).mockReturnValue(true);
    const amm = { id: 'ammId', approveUnderlyingTokenForPeripheryV1: jest.fn() };
    const signer: Signer = {} as Signer;

    await approveUnderlyingTokenService({ amm, signer } as never);

    expect(approvePeriphery).toHaveBeenCalledWith({ signer, ammId: amm.id });
    expect(approvePeripheryV2).not.toHaveBeenCalled();
    expect(amm.approveUnderlyingTokenForPeripheryV1).not.toHaveBeenCalled();
  });

  it('should call amm.approveUnderlyingTokenForPeripheryV1 if isV2AMM and isV1StatelessEnabled return false', async () => {
    (isV2AMM as jest.Mock).mockReturnValue(false);
    (isV1StatelessEnabled as jest.Mock).mockReturnValue(false);
    const amm = {
      id: 'ammId',
      approveUnderlyingTokenForPeripheryV1: jest.fn().mockResolvedValue(42),
    };
    const signer: Signer = {} as Signer;

    const result = await approveUnderlyingTokenService({ amm, signer } as never);

    expect(amm.approveUnderlyingTokenForPeripheryV1).toHaveBeenCalled();
    expect(approvePeriphery).not.toHaveBeenCalled();
    expect(approvePeripheryV2).not.toHaveBeenCalled();
    expect(result).toBe(42);
  });
});
