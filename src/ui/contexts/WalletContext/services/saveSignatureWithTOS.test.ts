import { REFERRAL_AND_SIGNATURES_URL } from './constants';
import { saveSignatureWithTOS } from './saveSignatureWithTOS';

jest.mock('isomorphic-fetch', () => jest.fn());
const mockFetch = require('isomorphic-fetch') as jest.Mock;

describe('saveSignatureWithTOS', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    jest.resetAllMocks();
  });

  it('should make a POST request to the correct URL', async () => {
    const walletAddress = '0x123...';
    const signature = 'signature';
    const termsOfService = 'terms of service';
    const referralCode = 'referralCode';
    await saveSignatureWithTOS(walletAddress, signature, termsOfService, referralCode);

    expect(mockFetch).toHaveBeenCalledWith(
      `${REFERRAL_AND_SIGNATURES_URL}/add-signature`,
      expect.any(Object),
    );
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should include the correct form data in the request', async () => {
    const walletAddress = '0x123...';
    const signature = 'signature';
    const termsOfService = 'terms of service';
    const referralCode = 'referralCode';
    await saveSignatureWithTOS(walletAddress, signature, termsOfService, referralCode);

    const formData = new FormData();
    formData.append('signature', signature);
    formData.append('walletAddress', walletAddress);
    formData.append('message', termsOfService);
    formData.append('referralCode', referralCode);

    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      body: formData,
    });
  });

  it('should not include referralCode if referralCode is null', async () => {
    const walletAddress = '0x123...';
    const signature = 'signature';
    const termsOfService = 'terms of service';
    const referralCode = null;
    await saveSignatureWithTOS(walletAddress, signature, termsOfService, referralCode);

    const formData = new FormData();
    formData.append('signature', signature);
    formData.append('walletAddress', walletAddress);
    formData.append('message', termsOfService);

    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      body: formData,
    });
  });

  it('should return the response from the server', async () => {
    // Mock the server response
    mockFetch.mockReturnValue(Promise.resolve({ ok: true }));

    // Call the function with some dummy data
    const walletAddress = '0x123...';
    const signature = 'signature';
    const termsOfService = 'terms of service';
    const referralCode = 'referralCode';

    // Get the response from the function
    const response = await saveSignatureWithTOS(
      walletAddress,
      signature,
      termsOfService,
      referralCode,
    );

    // Assert that the response is equal to the server response
    expect(response).toEqual({
      ok: true,
    });
  });
});
