import { getWalletRiskAssessment } from './getWalletRiskAssessment';
import { isWalletRisky } from './isWalletRisky';

/**
 * Will throw an error if the given wallet address is deemed as risky (has a shady history)
 * @param walletAddress - the wallet address to check
 */
export const checkForRiskyWallet = async (walletAddress: string) => {
  const riskAssessment = await getWalletRiskAssessment(walletAddress);
  if (isWalletRisky(riskAssessment)) {
    throw new Error('Risky Account Detected');
  }
};
