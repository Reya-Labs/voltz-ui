import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
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
  width: 340px;
  background: ${colors.liberty6};
  border: 1px solid ${colors.liberty3};
  border-radius: 8px;
`;

export const TitleTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  color: ${colors.lavenderWeb};
`;

export const DescriptionTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: ${colors.lavenderWeb2};
`;

export const GasCostBox = styled(Box)`
  display: flex;
  flex-direction: row;
  column-gap: ${({ theme }) => theme.spacing(2)};
  align-items: center;
`;

export const GasCostTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: ${colors.lavenderWeb3};
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

export const ProceedButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(4, 6)};
  gap: ${({ theme }) => theme.spacing(2.5)};

  background: #00556d;
  border-radius: 4px;

  color: ${colors.skyBlueCrayola};
  flex: 1;
`;

export const CancelButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(4, 6)};
  gap: ${({ theme }) => theme.spacing(2.5)};

  background: ${colors.liberty5};
  border-radius: 4px;

  color: ${colors.skyBlueCrayola};
  flex: 1;
`;

export const GasIcon = styled(LocalGasStationIcon)`
  color: #e1ddf7;

  font-size: 16px;
  line-height: 160%;
`;

const TransactionStatusTextTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

export const IdleTransactionStatusTextTypography = styled(TransactionStatusTextTypography)`
  color: ${colors.lavenderWeb2};
`;

export const SuccessTransactionStatusTextTypography = styled(TransactionStatusTextTypography)`
  color: ${colors.skyBlueCrayola};
`;

export const PendingTransactionStatusTextTypography = styled(TransactionStatusTextTypography)`
  color: ${colors.lavenderWeb2};
`;

export const ErrorTransactionStatusTextTypography = styled(TransactionStatusTextTypography)`
  color: ${colors.wildStrawberry};
`;
