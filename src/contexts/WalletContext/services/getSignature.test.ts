import { REFERRAL_AND_SIGNATURES_URL, UNAVAILABLE_TEXT } from './constants';
import { getSignature, SignatureResponse } from './getSignature';

jest.mock('isomorphic-fetch', () => jest.fn());
jest.mock('../../../utilities/sentry', () => ({
  getSentryTracker: () => ({
    captureException: jest.fn(),
  }),
}));

const mockFetch = require('isomorphic-fetch') as jest.Mock;

const mockSignatureResponse: SignatureResponse = {
  signature: 'signed-message',
  timestamp: '2022-01-01',
  walletAddress: '0x1234567890',
  message: 'This is the TOS text',
};

describe('getSignature', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    jest.resetAllMocks();
  });

  test('retrieves signature data successfully', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(mockSignatureResponse) });
    const result = await getSignature('0x1234567890');
    expect(result).toEqual(mockSignatureResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      `${REFERRAL_AND_SIGNATURES_URL}/get-signature/0x1234567890`,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  });

  test('throws error when response is not ok', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 });
    await expect(getSignature('0x1234567890')).rejects.toThrow(UNAVAILABLE_TEXT);
    expect(mockFetch).toHaveBeenCalledWith(
      `${REFERRAL_AND_SIGNATURES_URL}/get-signature/0x1234567890`,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  });

  test('throws error when 404 status code is returned', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 404 });
    const result = await getSignature('0x1234567890');
    expect(result).toBeUndefined();
    expect(mockFetch).toHaveBeenCalledWith(
      `${REFERRAL_AND_SIGNATURES_URL}/get-signature/0x1234567890`,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  });

  test('throws error and captures exception when fetch fails', async () => {
    mockFetch.mockRejectedValue(new Error('fetch failed'));
    await expect(getSignature('0x1234567890')).rejects.toThrow(UNAVAILABLE_TEXT);
  });
});
