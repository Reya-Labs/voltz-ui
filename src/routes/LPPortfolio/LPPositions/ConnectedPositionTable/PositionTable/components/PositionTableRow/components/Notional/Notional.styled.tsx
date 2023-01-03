import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { colors } from '../../../../../../../../../theme';

export const NotionalBox = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const NotionalLabelBox = styled(Box)`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
`;

export const NotionalLabelTypography = styled(Typography)`
  /* Label */
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 117% */

  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${colors.lavenderWeb2};
`;

export const NotionalValueTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;

  letter-spacing: 0.02em;
  color: ${colors.lavenderWeb};
`;

export const EditButton = styled(Button)`
  background: ${colors.liberty6};
  border-radius: 4px;

  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  padding: 0px;

  color: ${colors.wildStrawberry};
`;
