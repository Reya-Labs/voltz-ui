import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import { Typography } from '../../../../components/atomic/Typography/Typography';

export const EntryBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const EntryTopBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px 4px 16px;

  /* Liberty 5 */
  background: #1e1933;
  border-radius: 8px 8px 0px 0px;
`;

export const NameBox = styled(Box)`
  width: 220px;
  margin-right: 48px;

  display: flex;
  flex-direction: row;
  column-gap: 8px;
  align-items: center;
`;

export const NameTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;

  /* Lavender Web */
  color: #e1ddf7;
`;

export const BalanceTypography = styled(Typography)`
  margin-right: 64px;

  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 130%;

  /* Lavender Web 3 */
  color: #857ea5;
`;

export const APYTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 130%;
  /* or 23px */

  /* Wild Strawberry */
  color: #ff4aa9;
`;

export const DepositButton = styled(Link)`
  /* Liberty 4 */
  background: #2b2548;
  border-radius: 4px;

  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 14px;
  padding: 8px 13px;
  text-decoration: none;
  margin-left: auto;
  /* Sky Blue Crayola */
  color: #4de5ff;
`;

export const ManageButton = styled(Link)`
  /* Liberty 4 */
  background: #2b2548;
  border-radius: 0px 0px 4px 0px;

  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 14px;
  text-decoration: none;
  /* Sky Blue Crayola */
  color: #4de5ff;
  margin-left: auto;
  padding: 6px 13px;
`;

export const EntryBottomBox = styled(Box)`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 16px 16px;
  gap: 4px;

  /* Liberty 7 */
  background: #0f0d18;

  /* Liberty 5 */
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #1e1933;
  border-radius: 0px 0px 8px 8px;
  box-sizing: border-box;
`;

export const HeaderBox = styled(Box)`
  padding: 0px 0px 0px 23px;
  display: flex;
  flex-direction: row;
`;

const HeaderTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;

  /* Lavender Web 2 */
  color: #a49ebf;
`;

export const HeaderMaturityTypography = styled(HeaderTypography)`
  margin-right: 172px;
`;

export const HeaderDistributionTypography = styled(HeaderTypography)`
  margin-right: 30px;
`;

export const HeaderBalanceTypography = styled(HeaderTypography)`
  margin-right: 52px;
  color: #e1ddf7;
`;
export const HeaderPoolsTypography = styled(HeaderTypography)``;

export const EntryInfo = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px 24px;
  gap: 61px;

  /* Liberty 6 */
  background: #19152a;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

export const MaturityInfoBox = styled(Box)`
  display: flex;
  min-width: 171px;
`;

export const MaturityDateTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;

  /* Lavender Web */
  color: #e1ddf7;
`;

export const MaturityCompleteTypography = styled(MaturityDateTypography)`
  /* Sky Blue Crayola 2 */
  color: #369dae;
`;

const ValueBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 14px;

  /* Liberty 5 */
  background: #1e1933;

  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 14px;

  /* Lavender Web */
  color: #e1ddf7;
`;

export const DistributionBox = styled(ValueBox)``;
export const BalanceBox = styled(ValueBox)``;
export const PoolsBox = styled(ValueBox)``;
