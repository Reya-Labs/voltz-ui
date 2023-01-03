import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import { Typography } from '../../../components/atomic/Typography/Typography';
import { colors } from '../../../theme';

export const MainContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  background: ${colors.liberty5};
  border-radius: 8px;
`;

export const ContentBox = styled(Box)`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  background: ${colors.liberty7};
  border-radius: 8px;
`;

export const TitleTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 120%;
  margin-bottom: 24px;
  color: ${colors.lavenderWeb};
`;

export const DescriptionTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: ${colors.lavenderWeb};
`;

export const NavigateButton = styled(Link)`
  background: ${colors.liberty4};
  border-radius: 4px;
  margin-top: 8px;

  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 14px;
  text-decoration: none;
  color: ${colors.skyBlueCrayola};
  padding: 8px 13px;
`;
