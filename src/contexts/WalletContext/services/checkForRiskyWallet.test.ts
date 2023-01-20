import { checkForRiskyWallet } from './checkForRiskyWallet';
import { isWalletRisky } from './isWalletRisky';

jest.mock('./getWalletRiskAssessment', () => {
  return {
    getWalletRiskAssessment: jest.fn().mockResolvedValue({}),
  };
});

jest.mock('./isWalletRisky', () => {
  return {
    isWalletRisky: jest.fn().mockReturnValue(false),
  };
});

describe('checkForRiskyWallet', () => {
  test('does not throw an error when wallet is not risky', async () => {
    await expect(checkForRiskyWallet('0x1234567890')).resolves.not.toThrow();
  });

  test('throws an error when wallet is risky', async () => {
    (isWalletRisky as jest.Mock).mockReturnValue(true);
    await expect(checkForRiskyWallet('0x1234567890')).rejects.toThrow('Risky Account Detected');
  });
});
