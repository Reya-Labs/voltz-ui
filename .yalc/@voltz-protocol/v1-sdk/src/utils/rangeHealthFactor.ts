import { HealthFactorStatus } from '../entities';

export const getRangeHealthFactor = (
  fixedLow: number,
  fixedHigh: number,
  currentAPR: number,
): HealthFactorStatus => {
  if (fixedLow < currentAPR && currentAPR < fixedHigh) {
    if (
      0.15 * fixedHigh + 0.85 * fixedLow > currentAPR ||
      currentAPR > 0.85 * fixedHigh + 0.15 * fixedLow
    ) {
      return HealthFactorStatus.WARNING;
    }
    return HealthFactorStatus.HEALTHY;
  }
  return HealthFactorStatus.DANGER;
};
