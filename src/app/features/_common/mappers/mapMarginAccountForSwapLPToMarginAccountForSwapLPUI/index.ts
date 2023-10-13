import { Tokens } from '@voltz-protocol/api-sdk-v2';

import { compactFormatToParts } from '../../../../../utilities/number';
import {
  MarginAccountForSwapLP,
  MarginAccountForSwapLPUI,
} from '../../../margin-accounts-for-swap-lp';

export const mapMarginAccountForSwapLPToMarginAccountForSwapLPUI = (
  marginAccount: MarginAccountForSwapLP,
  poolToken: Tokens,
): MarginAccountForSwapLPUI => {
  return {
    id: marginAccount.id,
    chainId: marginAccount.chainId,
    name: marginAccount.name,
    balanceCompactFormatted: compactFormatToParts(marginAccount.balance, 2, 2),
    initialMarginPreTradeCompactFormatted: compactFormatToParts(
      marginAccount.initialMarginPreTrade,
      2,
      2,
    ),
    settlementToken: marginAccount.settlementToken,
    poolToken,
  };
};
