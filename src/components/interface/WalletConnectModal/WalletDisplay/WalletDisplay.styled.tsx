import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import colors from '../../../../theme/colors';
import { Typography } from '../../../atomic/Typography/Typography';

export const ContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 16px;

  width: 364px;

  /* Liberty 6 */
  background: #19152a;

  /* Liberty 3 */
  border: 1px solid #38305b;
  border-radius: 8px;
  box-sizing: border-box;
`;

export const ButtonBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
`;

export const HeaderBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`;

export const ChangeWalletButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(4, 6)};
  gap: ${({ theme }) => theme.spacing(2.5)};

  background: #00556d;
  border-radius: 4px;

  color: ${colors.skyBlueCrayola.base};
  flex: 1;
`;

export const DescriptionTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;

  /* Lavender Web 2 */
  color: #a49ebf;
`;

export const ConnectedWithTypography = styled(Typography)`
  font-size: 20px;
`;

export const DisconnectButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(4, 6)};
  gap: ${({ theme }) => theme.spacing(2.5)};

  /* Liberty 5 */
  background: #1e1933;
  border-radius: 4px;

  color: ${colors.skyBlueCrayola.base};
  flex: 1;
`;
