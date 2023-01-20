import { getSentryTracker } from '../../../utilities/sentry';
import { getSignature, isMessageEIP1271Signed, saveSignatureWithTOS } from './';
import { checkForTOSSignature } from './checkForTOSSignature';

jest.mock('../../../utilities/sentry', () => {
  return {
    getSentryTracker: jest.fn().mockReturnValue({
      captureException: jest.fn(),
    }),
  };
});

jest.mock('../../../utilities/referrer-store', () => {
  return {
    getReferrer: jest.fn().mockReturnValue(''),
  };
});

jest.mock('./getSignature', () => {
  return {
    getSignature: jest.fn().mockResolvedValue(null),
  };
});

jest.mock('./getTOSText', () => {
  return {
    getTOSText: jest.fn().mockReturnValue('This is the TOS text'),
  };
});

jest.mock('./isMessageEIP1271Signed', () => {
  return {
    isMessageEIP1271Signed: jest.fn().mockResolvedValue(false),
  };
});

jest.mock('./saveSignatureWithTOS', () => {
  return {
    saveSignatureWithTOS: jest.fn().mockResolvedValue({ ok: true }),
  };
});

const mockSigner = {
  getAddress: jest.fn().mockResolvedValue('0x1234567890'),
  signMessage: jest.fn().mockResolvedValue('signed-message'),
};

describe('checkForTOSSignature', () => {
  test('throws an error if checkForTOSSignature throws error', async () => {
    (saveSignatureWithTOS as jest.Mock).mockRejectedValue('Error happened');
    await expect(checkForTOSSignature(mockSigner as never)).rejects.toThrow(
      'Error processing signature',
    );
    expect(getSentryTracker).toHaveBeenCalledTimes(1);
  });

  test('does not throw an error if the user signs the TOS', async () => {
    (isMessageEIP1271Signed as jest.Mock).mockResolvedValue(true);
    (getSignature as jest.Mock).mockResolvedValue({
      walletAddress: '0x1234567890',
      message: 'This is the TOS text',
    });
    await expect(checkForTOSSignature(mockSigner as never)).resolves.not.toThrow();
  });
});
