import { WalletRiskAssessment } from '../types';

/**
 * Returns true or false based upon if the given risk assessment would suggest the wallet is risky
 * @param riskAssessment - Risk report foir a wallet obtained from using walletSecurityCheck
 */
export const isWalletRisky = (riskAssessment?: WalletRiskAssessment) => {
  const indicators = riskAssessment?.addressRiskIndicators;
  const redFlag =
    Array.isArray(indicators) && indicators.find((i) => i.categoryRiskScoreLevel >= 10);
  return Boolean(redFlag);
};
