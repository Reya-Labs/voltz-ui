import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../../../theme';

export const NetMarginBox = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const NetMarginDiffBox = styled(Box)`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
`;

export const NetMarginTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${colors.lavenderWeb1};
`;

const NetMarginDiffTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

export const PositiveNetMarginDiffTypography = styled(NetMarginDiffTypography)`
  color: ${colors.skyBlueCrayola};
`;
export const NegativeNetMarginDiffTypography = styled(NetMarginDiffTypography)`
  color: ${colors.wildStrawberry};
`;
export const NetMarginValueBox = styled(Box)`
  padding: 8px 14px;
  /* Liberty 4 */
  background: #2b2548;
  border-radius: 4px;
`;

export const NetMarginValueTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 14px;

  color: ${colors.lavenderWeb};
`;
