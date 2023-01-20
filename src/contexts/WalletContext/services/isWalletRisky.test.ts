import { WalletRiskAssessment } from '../types';
import { isWalletRisky } from './isWalletRisky';

describe('isWalletRisky', () => {
  it('should return true if the risk assessment has a red flag', () => {
    const riskAssessment: WalletRiskAssessment = {
      addressRiskIndicators: [
        { categoryRiskScoreLevel: 9 },
        { categoryRiskScoreLevel: 10 },
        { categoryRiskScoreLevel: 11 },
      ],
    } as never;
    expect(isWalletRisky(riskAssessment)).toBe(true);
  });

  it('should return false if the risk assessment has no red flags', () => {
    const riskAssessment: WalletRiskAssessment = {
      addressRiskIndicators: [
        { categoryRiskScoreLevel: 9 },
        { categoryRiskScoreLevel: 5 },
        { categoryRiskScoreLevel: 7 },
      ],
    } as never;
    expect(isWalletRisky(riskAssessment)).toBe(false);
  });

  it('should return false if the risk assessment is undefined', () => {
    expect(isWalletRisky(undefined)).toBe(false);
  });

  it('should return false if the risk assessment has no addressRiskIndicators', () => {
    const riskAssessment: WalletRiskAssessment = {} as never;
    expect(isWalletRisky(riskAssessment)).toBe(false);
  });
});
