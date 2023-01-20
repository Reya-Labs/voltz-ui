import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../../components/atomic/Typography/Typography';
import colors from '../../../../../theme/colors';

export const ContentBox = styled(Box)`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
  width: 100%;
`;

export const DescriptionTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.02em;

  /* Lavender Web */
  color: #e1ddf7;
`;

export const ActionBox = styled(Box)`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;

  /* Liberty 5 */
  background: #1e1933;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

export const ActionLeftContentBox = styled(Box)`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;
export const ActionRightContentBox = styled(Box)`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const BatchButton = styled(Button)`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px 16px;
  gap: 8px;

  /* Liberty 4 */
  background: #2b2548;
  border-radius: 4px;

  color: ${colors.skyBlueCrayola.base};
  flex: 1;

  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  text-transform: uppercase;
`;

export const BatchBudgetContentBox = styled(Box)`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  /* Liberty 5 */
  background: #1e1933;
  border-radius: 4px;
`;

export const GasIcon = styled(LocalGasStationIcon)`
  color: #a49ebf;

  font-size: 12px;
  line-height: 160%;
`;

const BatchBudgetText = styled(Typography)`
  display: inline-block;
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 125% */
  letter-spacing: 0.02em;
`;

export const BatchBudgetTextTypography = styled(BatchBudgetText)`
  color: #a49ebf;
`;

export const BatchBudgetCurrencyTypography = styled(BatchBudgetText)`
  color: #297a88;
`;

export const BatchBudgetValueTypography = styled(BatchBudgetText)`
  color: #4de5ff;
`;

export const GasCostInputLabel = styled(InputLabel)`
  position: relative;
  margin: 0;
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
  font-size: 12px;
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
