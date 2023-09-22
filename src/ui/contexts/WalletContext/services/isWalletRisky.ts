import { WalletRiskAssessment } from '../types';

/**
 * It returns true if the risk assessment has a red flag
 * @param {WalletRiskAssessment} [riskAssessment] - The risk assessment object returned from the API.
 * @returns A boolean value.
 */
export const isWalletRisky = (riskAssessment?: WalletRiskAssessment) => {
  const indicators = riskAssessment?.addressRiskIndicators;
  const redFlag =
    Array.isArray(indicators) && indicators.find((i) => i.categoryRiskScoreLevel >= 10);
  return Boolean(redFlag);
};
