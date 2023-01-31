import Box from '@mui/material/Box';
import MUILink from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import { Typography } from '../../../../../components/atomic/Typography/Typography';
import { ReactComponent as CircledBlueCheckmarkIcon } from './circled-blue-checkmark.svg';

export const CircledBlueCheckmark = styled(CircledBlueCheckmarkIcon)`
  margin-bottom: 32px;
  margin-top: 16px;
`;

export const TopBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const BottomBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 40px;

  width: 340px;

  /* Liberty 6 */
  background: #19152a;

  /* Liberty 3 */
  border: 1px solid #38305b;
  border-radius: 8px;
  box-sizing: border-box;
`;

export const TitleTypography = styled(Typography)`
  /* H4 Headline */
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  /* identical to box height, or 26px */

  letter-spacing: 0.02em;

  /* Lavender Web */
  color: #e5e1f9;

  margin-bottom: 16px;
`;

export const ViewOnEtherScanLink = styled(MUILink)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 117% */

  letter-spacing: 0.02em;
  text-transform: uppercase;

  /* Sky Blue Crayola */
  color: #4de5ff;

  margin-bottom: 32px;
`;

export const GotoYourPortfolioLink = styled(Link)`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
  gap: 10px;

  text-decoration: none;

  /* Sky Blue Crayola 3 */
  background: #00556d;
  border-radius: 4px;

  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 14px;
  /* identical to box height, or 78% */
  letter-spacing: 0.02em;
  text-transform: uppercase;

  /* Sky Blue Crayola */
  color: #4de5ff;
`;
