import { getBalance as getBalanceV1Mock } from '@voltz-protocol/sdk-v1-stateless';
import { getBalance as getBalanceV2Mock } from '@voltz-protocol/sdk-v2';

import { isV2AMM } from '../../../../../../utilities/amm';
import { isV1StatelessEnabled } from '../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { getWalletBalanceService } from '.';

jest.mock('@voltz-protocol/sdk-v1-stateless');
jest.mock('@voltz-protocol/sdk-v2');
jest.mock('@voltz-protocol/v1-sdk');
jest.mock('../../../../../../utilities/amm');
jest.mock('../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled');

describe('getWalletBalanceService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 0 if either amm or signer is not provided', async () => {
    const balance = await getWalletBalanceService({ amm: null!, signer: null! });

    expect(balance).toBe(0);
  });

  it('should call getBalanceV2 if isV2AMM returns true', async () => {
    const amm = { id: 'your-amm-id' };
    const signer = {};
    const getBalanceV2MockFn = getBalanceV2Mock as jest.MockedFunction<typeof getBalanceV2Mock>;
    (isV2AMM as jest.Mock).mockReturnValue(true);
    getBalanceV2MockFn.mockResolvedValue(10);

    const balance = await getWalletBalanceService({ amm, signer } as never);

    expect(balance).toBe(10);
    expect(getBalanceV2MockFn).toHaveBeenCalledWith({ ammId: amm.id, signer });
  });

  it('should call getBalance if isV2AMM returns false and isV1StatelessEnabled returns true', async () => {
    const amm = { id: 'your-amm-id' };
    const signer = {};
    const getBalanceMockFn = getBalanceV1Mock as jest.MockedFunction<typeof getBalanceV1Mock>;
    (isV2AMM as jest.Mock).mockReturnValue(false);
    (isV1StatelessEnabled as jest.Mock).mockReturnValue(true);
    getBalanceMockFn.mockResolvedValue(20);

    const balance = await getWalletBalanceService({ amm, signer } as never);

    expect(balance).toBe(20);
    expect(getBalanceMockFn).toHaveBeenCalledWith({ ammId: amm.id, signer });
  });

  it('should return amm.underlyingTokens if isV2AMM returns false and isV1StatelessEnabled returns false', async () => {
    const underlyingTokensMock = jest.fn().mockResolvedValue(30);
    const amm = { id: 'your-amm-id', underlyingTokens: underlyingTokensMock };
    const signer = {};
    (isV2AMM as jest.Mock).mockReturnValue(false);
    (isV1StatelessEnabled as jest.Mock).mockReturnValue(false);

    const balance = await getWalletBalanceService({ amm, signer } as never);

    expect(balance).toBe(30);
    expect(underlyingTokensMock).toHaveBeenCalled();
  });
});
