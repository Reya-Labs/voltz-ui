import { compactFormatToParts } from '../../../../../utilities/number';
import { PortfolioMarginAccount } from '../../../portfolio';
import { MarginAccountUI } from '../../../portfolio/types';

export const mapMarginAccountToMarginAccountUI = (
  marginAccount: PortfolioMarginAccount,
): MarginAccountUI => {
  return {
    id: marginAccount.id,
    chainId: marginAccount.chainId,
    marginRatioPercentage: marginAccount.marginRatioPercentage,
    name: marginAccount.name,
    positionsCount: marginAccount.positionsCount.toString(),
    balanceCompactFormat: compactFormatToParts(marginAccount.balance, 2, 2),
    marginRatioHealth: marginAccount.marginRatioHealth as MarginAccountUI['marginRatioHealth'],
  };
};
