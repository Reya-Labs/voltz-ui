import { getAllowanceToPeriphery as getAllowanceToPeripheryV1Mock } from '@voltz-protocol/sdk-v1-stateless';
import { getAllowanceToPeriphery as getAllowanceToPeripheryV2Mock } from '@voltz-protocol/sdk-v2';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { isV2AMM } from '../../../../../../utilities/amm';
import { getAlchemyKey } from '../../../../../../utilities/getAlchemyKey';
import { getInfuraKey } from '../../../../../../utilities/getInfuraKey';
import { isV1StatelessEnabled } from '../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { getUnderlyingTokenAllowanceService } from '.';

jest.mock('@voltz-protocol/sdk-v1-stateless');
jest.mock('@voltz-protocol/sdk-v2');
jest.mock('@voltz-protocol/v1-sdk');
jest.mock('../../../../../../utilities/amm');
jest.mock('../../../../../../utilities/getAlchemyKey');
jest.mock('../../../../../../utilities/getInfuraKey');
jest.mock('../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled');

describe('getUnderlyingTokenAllowanceService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 0 if either amm or signer is not provided', async () => {
    const allowance = await getUnderlyingTokenAllowanceService({
      amm: null!,
      signer: null!,
      chainId: SupportedChainId.mainnet,
    });

    expect(allowance).toBe(0);
  });

  it('should call getAllowanceToPeripheryV2 if isV2AMM returns true', async () => {
    const amm = { id: 'your-amm-id' };
    const signer = {};
    const getAllowanceToPeripheryV2MockFn = getAllowanceToPeripheryV2Mock as jest.MockedFunction<
      typeof getAllowanceToPeripheryV2Mock
    >;
    (isV2AMM as jest.Mock).mockReturnValue(true);
    getAllowanceToPeripheryV2MockFn.mockResolvedValue(10);

    const allowance = await getUnderlyingTokenAllowanceService({
      amm,
      signer,
      chainId: SupportedChainId.mainnet,
    } as never);

    expect(allowance).toBe(10);
    expect(getAllowanceToPeripheryV2MockFn).toHaveBeenCalledWith({ ammId: amm.id, signer });
  });

  it('should call getAllowanceToPeriphery if isV2AMM returns false and isV1StatelessEnabled returns true', async () => {
    const amm = { id: 'your-amm-id' };
    const signer = {};
    const getAllowanceToPeripheryV1MockFn = getAllowanceToPeripheryV1Mock as jest.MockedFunction<
      typeof getAllowanceToPeripheryV1Mock
    >;
    (isV2AMM as jest.Mock).mockReturnValue(false);
    (isV1StatelessEnabled as jest.Mock).mockReturnValue(true);
    getAllowanceToPeripheryV1MockFn.mockResolvedValue(20);

    const allowance = await getUnderlyingTokenAllowanceService({
      amm,
      signer,
      chainId: SupportedChainId.mainnet,
    } as never);

    expect(allowance).toBe(20);
    expect(getAllowanceToPeripheryV1MockFn).toHaveBeenCalledWith({ ammId: amm.id, signer });
  });

  it('should call amm.getUnderlyingTokenAllowance if isV2AMM returns false, isV1StatelessEnabled returns false', async () => {
    const underlyingTokenAllowanceMock = jest.fn().mockResolvedValue(30);
    const amm = { id: 'your-amm-id', getUnderlyingTokenAllowance: underlyingTokenAllowanceMock };
    const signer = {};
    (isV2AMM as jest.Mock).mockReturnValue(false);
    (isV1StatelessEnabled as jest.Mock).mockReturnValue(false);
    (getAlchemyKey as jest.Mock).mockReturnValue('your-alchemy-api-key');
    (getInfuraKey as jest.Mock).mockReturnValue('your-infura-api-key');

    const allowance = await getUnderlyingTokenAllowanceService({
      amm,
      signer,
      chainId: SupportedChainId.mainnet,
    } as never);

    expect(allowance).toBe(30);
    expect(amm.getUnderlyingTokenAllowance).toHaveBeenCalledWith({
      forceErc20Check: false,
      chainId: SupportedChainId.mainnet,
      alchemyApiKey: 'your-alchemy-api-key',
      infuraApiKey: 'your-infura-api-key',
    });
    expect(getAlchemyKey).toHaveBeenCalled();
    expect(getInfuraKey).toHaveBeenCalled();
  });
});
