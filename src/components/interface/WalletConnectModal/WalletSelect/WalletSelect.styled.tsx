import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { colors } from '../../../../theme';
import { Typography } from '../../../atomic/Typography/Typography';

export const ContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 20px;

  width: 364px;

  /* Liberty 6 */
  background: #19152a;

  /* Liberty 3 */
  border: 1px solid #38305b;
  border-radius: 8px;
  box-sizing: border-box;
`;

export const HeaderBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ConnectWalletTypography = styled(Typography)`
  font-size: 20px;
`;

export const WalletOptionsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
`;

export const MoreOptionsTypography = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-left: auto;
  margin-right: auto;
`;

export const CloseWalletSelect = styled(CloseIcon)`
  color: ${colors.lavenderWeb.base};
  font-size: 20px;
`;
