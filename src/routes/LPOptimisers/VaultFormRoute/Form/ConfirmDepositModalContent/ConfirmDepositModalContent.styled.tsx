import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../../components/atomic/Typography/Typography';
import colors from '../../../../../theme/colors';

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

export const GasCostTypography = styled(BaseGasCostTypography)`
  /* Lavender Web 3 */
  color: #e1ddf7;
`;

export const GasCostTokenTypography = styled(BaseGasCostTypography)`
  /* Lavender Web 3 */
  color: #a49ebf;
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

export const DepositButton = styled(Button)`
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

export const BatchFeeContentBox = styled(Box)`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;

  /* Liberty 5 */
  background: #1e1933;
  border-radius: 4px;
`;

const BatchFeeText = styled(Typography)`
  display: inline-block;
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height, or 125% */
  letter-spacing: 0.02em;
`;

export const BatchFeeTextTypography = styled(BatchFeeText)`
  color: #a49ebf;
`;

export const BatchFeeCurrencyTypography = styled(BatchFeeText)`
  color: #297a88;
`;

export const BatchFeeValueTypography = styled(BatchFeeText)`
  color: #4de5ff;
`;

export const GasCostInputLabel = styled(InputLabel)`
  position: relative;
  margin: 0;
`;
