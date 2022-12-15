import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../components/atomic/Typography/Typography';

export const HeaderBox = styled(Box)`
  display: flex;
  flex-direction: row;
  /* Liberty 6 */
  border-bottom: 1px solid #19152a;
  padding: 0px 38px;
`;

export const HeaderTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  /* identical to box height, or 17px */

  /* Lavender Web */
  color: #e1ddf7;
`;

export const NameTypography = styled(HeaderTypography)`
  margin-right: 150px;
`;

export const BalanceTypography = styled(HeaderTypography)`
  margin-right: 56px;
`;

export const APYTypography = styled(HeaderTypography)``;
