import { getVoyages } from '@voltz-protocol/v1-sdk';

import { rejectThunkWithError } from '../../../helpers';
import { fetchVoyageBadgesThunkHandler } from '.';

jest.mock('@voltz-protocol/v1-sdk');
jest.mock('../../../helpers');

describe('fetchVoyageBadgesThunkHandler', () => {
  const mockAccount = '0x123';
  const mockChainId = '1';
  const mockVoyages = [{ id: '1' }, { id: '2' }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the voyages for the given account and chain ID', async () => {
    (getVoyages as jest.Mock).mockResolvedValue(mockVoyages);

    const result = await fetchVoyageBadgesThunkHandler(
      {
        account: mockAccount,
        chainId: mockChainId,
      } as never,
      {} as never,
    );

    expect(getVoyages).toHaveBeenCalledWith({ chainId: mockChainId, account: mockAccount });
    expect(result).toEqual(mockVoyages);
  });

  it('should return a rejected thunk with an error if getVoyages throws an error', async () => {
    const mockError = new Error('Failed to fetch voyages');
    (getVoyages as jest.Mock).mockRejectedValue(mockError);

    await fetchVoyageBadgesThunkHandler(
      {
        account: mockAccount,
        chainId: mockChainId,
      } as never,
      {} as never,
    );

    expect(getVoyages).toHaveBeenCalledWith({ chainId: mockChainId, account: mockAccount });
    expect(rejectThunkWithError).toHaveBeenCalledWith(expect.any(Object), mockError);
  });
});
