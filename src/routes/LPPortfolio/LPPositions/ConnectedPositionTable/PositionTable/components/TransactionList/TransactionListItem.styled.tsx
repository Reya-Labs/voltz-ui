import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { Icon as IconComponent } from '../../../../../../../components/atomic/Icon/Icon';
import { Typography } from '../../../../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../../../../theme';

export const TransactionListItemBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px 8px 32px;
`;

export const TransactionListItemLeftBox = styled(Box)`
  display: flex;
  flex-direction: row;

  background: ${colors.liberty5};
  border-radius: 0px 0px 8px 8px;

  column-gap: 24px;
`;

export const CellBox = styled(Box)`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  align-items: center;
`;

export const LabelCellBox = styled(CellBox)`
  min-width: 110px;
`;

export const HistoryButton = styled(Button)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  padding: 0px;
  text-decoration-line: underline;
  color: ${colors.lavenderWeb};
`;

export const DateTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: ${colors.lavenderWeb2};
`;

export const LabelTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: ${colors.lavenderWeb};
`;

export const ItemLabelTypography = styled(Typography)`
  min-width: 80px;
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  color: ${colors.lavenderWeb2};
`;

export const Icon = styled(IconComponent)`
  width: 16px;
  height: 16px;
`;
