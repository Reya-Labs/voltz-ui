import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../../components/atomic/Typography/Typography';
import colors from '../../../../../theme/colors';

export const ContentBox = styled(Box)`
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;
export const ActionRightContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const BatchButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px 16px;
  gap: 8px;

  /* Liberty 4 */
  background: #2b2548;
  border-radius: 4px;

  color: ${colors.skyBlueCrayola.base};

  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  text-transform: uppercase;
`;

export const BatchBudgetContentBox = styled(Box)`
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

export const BatchBudgetValueBox = styled(Box)`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;
export const BatchBudgetTextTypography = styled(BatchBudgetText)`
  color: #a49ebf;
`;

export const BatchBudgetTextBox = styled(Box)`
  color: #a49ebf;
`;

export const BatchBudgetUSDCurrencyTypography = styled(BatchBudgetText)`
  /* Lavender Web 5 */
  color: #4d476a;
`;

export const BatchBudgetUnderlyingTypography = styled(BatchBudgetText)`
  color: #4de5ff;
`;
