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

  /* Liberty 6 */
  background: #19152a;

  /* Liberty 3 */
  border: 1px solid #38305b;
  border-radius: 8px;
`;

export const TitleTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;

  /* Lavender Web */
  color: #e1ddf7;
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

export const GasCostBox = styled(Box)`
  display: flex;
  flex-direction: row;
  column-gap: ${({ theme }) => theme.spacing(2)};
  align-items: center;
`;

const BaseGasCostTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  display: inline-block;
`;

export const GasCostTokenTypography = styled(BaseGasCostTypography)`
  /* Lavender Web 3 */
  color: #857ea5;
`;

export const GasCostTypography = styled(BaseGasCostTypography)`
  /* Lavender Web 3 */
  color: #e1ddf7;
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

  color: ${colors.skyBlueCrayola.base};
  flex: 1;
`;

export const CancelButton = styled(Button)`
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
  /* Lavender Web 2 */
  color: #a49ebf;
`;

export const SuccessTransactionStatusTextTypography = styled(TransactionStatusTextTypography)`
  color: ${colors.skyBlueCrayola.base};
`;

export const PendingTransactionStatusTextTypography = styled(TransactionStatusTextTypography)`
  /* Lavender Web 2 */
  color: #a49ebf;
`;

export const ErrorTransactionStatusTextTypography = styled(TransactionStatusTextTypography)`
  color: ${colors.wildStrawberry.base};
`;
