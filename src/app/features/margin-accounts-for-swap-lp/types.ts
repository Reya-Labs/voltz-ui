import { Tokens } from '@voltz-protocol/api-sdk-v2';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { CompactFormatParts } from '../../../utilities/number';
import { MarginAccountForSwapLP } from './thunks';

export type SliceState = {
  poolToken: Tokens;
  marginAccountsForSelection: MarginAccountForSwapLP[];
  marginAccountsForSelectionLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
};

export type MarginAccountForSwapLPUI = {
  id: string;
  chainId: SupportedChainId;
  settlementToken?: Tokens | null;
  name: string;
  balanceCompactFormatted: CompactFormatParts;
  initialMarginPreTradeCompactFormatted: CompactFormatParts;
  poolToken: Tokens;
};
