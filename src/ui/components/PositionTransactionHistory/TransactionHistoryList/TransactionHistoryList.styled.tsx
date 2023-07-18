import styled from '@emotion/styled';
import { ColorTokens, getColorFromToken } from 'brokoli-ui';

import { ReactComponent as Burn } from './assets/burn.svg';
import { ReactComponent as Liquidation } from './assets/liquidation.svg';
import { ReactComponent as MarginUpdate } from './assets/margin-update.svg';
import { ReactComponent as Maturity } from './assets/maturity.svg';
import { ReactComponent as Mint } from './assets/mint.svg';
import { ReactComponent as Settle } from './assets/settle.svg';
import { ReactComponent as Swap } from './assets/swap.svg';

export const HeaderBox = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  padding-left: 8px;
`;

export const EntryBox = styled('div', {
  shouldForwardProp: (prop) => prop !== 'backgroundColorToken',
})<{
  backgroundColorToken: ColorTokens;
}>`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  background-color: ${({ backgroundColorToken }) => getColorFromToken(backgroundColorToken)};
`;

const InfoBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DateBox = styled(InfoBox)`
  width: 125px;
`;
export const ActionBox = styled(InfoBox)`
  width: 140px;
  gap: 8px;
`;
export const SizeBox = styled(InfoBox)`
  width: 140px;
`;
export const OutcomeBox = styled(InfoBox)`
  width: 151px;
`;

export const TransactionHistoryListBox = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
`;
export const TransactionHistoryEntriesBox = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  background: ${getColorFromToken('liberty8')};
  padding: 4px;
  border: 1px solid ${getColorFromToken('lavenderWeb7')};
  border-radius: 4px;
`;
export const LiquidationIcon = styled(Liquidation)`
  width: 14px;
  height: 14px;
`;
export const MarginUpdateIcon = styled(MarginUpdate)`
  width: 14px;
  height: 14px;
`;
export const SettleIcon = styled(Settle)`
  width: 14px;
  height: 14px;
`;
export const SwapIcon = styled(Swap)`
  width: 14px;
  height: 14px;
`;
export const BurnIcon = styled(Burn)`
  width: 14px;
  height: 14px;
`;
export const MintIcon = styled(Mint)`
  width: 14px;
  height: 14px;
`;

export const MaturityIcon = styled(Maturity)`
  width: 14px;
  height: 14px;
`;
