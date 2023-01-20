import { getSentryTracker } from '../../../utilities/sentry';
import { getWalletRiskAssessment } from './getWalletRiskAssessment';

jest.mock('isomorphic-fetch', () => jest.fn());
jest.mock('../../../utilities/sentry', () => ({
  getSentryTracker: () => ({
    captureException: jest.fn(),
  }),
}));

const mockFetch = require('isomorphic-fetch') as jest.Mock;

describe('getWalletRiskAssessment', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    jest.resetAllMocks();
  });

  it('should make a request to TRM with the correct parameters', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({}) });

    const walletId = '0x123456789';
    await getWalletRiskAssessment(walletId);

    const expectedBody = JSON.stringify([{ address: walletId, chain: 'ethereum' }]);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.trmlabs.com/public/v2/screening/addresses',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Basic ${btoa(process.env.REACT_APP_TRM_API_KEY || '')}`,
        },
        body: expectedBody,
      },
    );
  });

  it('should return the data if the request is successful', async () => {
    const expectedData = { address: '0x123456789', assessment: 'high_risk' };
    mockFetch.mockResolvedValue({ ok: true, json: () => [expectedData] });

    const result = await getWalletRiskAssessment('0x123456789');
    expect(result).toEqual(expectedData);
  });

  it('should throw an error if the request is not successful', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 400, text: () => 'Bad Request' });

    await expect(getWalletRiskAssessment('0x123456789')).rejects.toThrow(
      'Service unavailable, please try again shortly',
    );
  });

  it('should call the Sentry tracker if an exception is thrown', async () => {
    mockFetch.mockRejectedValue(new Error('Fetch Error'));

    try {
      await getWalletRiskAssessment('0x123456789');
    } catch (error) {
      // ignore error
    }

    expect(getSentryTracker).toHaveBeenCalled();
  });
});
