import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../../../components/atomic/Typography/Typography';
import colors from '../../../../../../theme/colors';

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

export const BatchFeeContentBox = styled(Box)`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  justify-content: space-between;

  /* Liberty 5 */
  background: #1e1933;
  border-radius: 4px;

  width: 100%;
  box-sizing: border-box;
`;

const BatchBudgetText = styled(Typography)`
  display: inline-block;
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height, or 125% */
  letter-spacing: 0.02em;
`;

export const BatchBudgetValueBox = styled(Box)`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

export const BatchBudgetUSDCurrencyTypography = styled(BatchBudgetText)`
  /* Lavender Web 5 */
  color: #4d476a;
`;

export const BatchBudgetUnderlyingTypography = styled(BatchBudgetText)`
  color: #4de5ff;
`;

export const BatchBudgetTextTypography = styled(BatchBudgetText)`
  color: #a49ebf;
`;
