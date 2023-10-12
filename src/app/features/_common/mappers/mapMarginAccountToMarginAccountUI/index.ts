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
    balanceCompactFormatted: compactFormatToParts(marginAccount.balance, 2, 2),
    balanceUSDCompactFormatted: compactFormatToParts(marginAccount.balanceUSD, 2, 2),
    initialMarginPreTradeCompactFormatted: compactFormatToParts(
      marginAccount.initialMarginPreTrade,
      2,
      2,
    ),
    marginRatioHealth: marginAccount.marginRatioHealth as MarginAccountUI['marginRatioHealth'],
    settlementToken: marginAccount.settlementToken,
  };
};
